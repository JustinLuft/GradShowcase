import React, { useState, useEffect, useCallback } from 'react';
import SearchFilter from '@/components/SearchFilter';
import GraduateProfileCard from '@/components/GraduateProfileCard';
import { db } from '@/firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Graduate {
  id: string;
  name: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  website?: string;
  profileImage?: string;
  role: string;
  graduationCohort: string;
  skillTags: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface GraduateCardProps {
  id: string;
  name: string;
  title: string;
  location: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl?: string;
  email: string;
  graduationCohort?: string;
}

export interface SearchFilterProps {
  onSearch: (filters: FilterOptions) => void;
  availableRoles: string[];
  availableCohorts: string[];
  availableSkills: string[];
  availableLocations: string[];
}

interface FilterOptions {
  keyword?: string;
  techStack: string[];
  location?: string;
  role?: string;
  graduationCohort?: string;
}

const BrowseGraduatesPage = () => {
  const [graduates, setGraduates] = useState<GraduateCardProps[]>([]);
  const [filteredGraduates, setFilteredGraduates] = useState<GraduateCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform database graduate to card format
  const transformGraduateData = (graduate: Graduate): GraduateCardProps => {
    // Fallback function for legacy profiles without structured data
    const extractTechStackFromBio = (bio: string): string[] => {
      const techKeywords = [
        'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'Node.js', 
        'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
        'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'SASS', 'SCSS',
        'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker',
        'GraphQL', 'REST', 'API', 'Git', 'Linux', 'Ubuntu'
      ];
      
      const foundTech = techKeywords.filter(tech => 
        bio.toLowerCase().includes(tech.toLowerCase())
      );
      
      return foundTech.length > 0 ? foundTech.slice(0, 5) : ['Software Development'];
    };

    // Fallback function for legacy profiles without role field
    const extractTitleFromBio = (bio: string): string => {
      const titleKeywords = [
        { keywords: ['frontend', 'front-end', 'front end'], title: 'Frontend Developer' },
        { keywords: ['backend', 'back-end', 'back end'], title: 'Backend Developer' },
        { keywords: ['fullstack', 'full-stack', 'full stack'], title: 'Full Stack Developer' },
        { keywords: ['mobile', 'ios', 'android'], title: 'Mobile Developer' },
        { keywords: ['data', 'analyst', 'science'], title: 'Data Analyst' },
        { keywords: ['devops', 'cloud'], title: 'DevOps Engineer' },
        { keywords: ['ui', 'ux', 'design'], title: 'UI/UX Designer' },
        { keywords: ['qa', 'test', 'quality'], title: 'QA Engineer' }
      ];

      const lowerBio = bio.toLowerCase();
      for (const { keywords, title } of titleKeywords) {
        if (keywords.some(keyword => lowerBio.includes(keyword))) {
          return title;
        }
      }
      
      return 'Software Developer';
    };

    return {
      id: graduate.id,
      name: graduate.name,
      // Use structured role field if available, otherwise extract from bio
      title: graduate.role || extractTitleFromBio(graduate.bio),
      location: graduate.location,
      imageUrl: graduate.profileImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
      // Use structured skillTags if available, otherwise extract from bio
      techStack: graduate.skillTags && graduate.skillTags.length > 0 
        ? graduate.skillTags 
        : extractTechStackFromBio(graduate.bio),
      githubUrl: graduate.github,
      linkedinUrl: graduate.linkedin,
      websiteUrl: graduate.website,
      email: graduate.email,
      graduationCohort: graduate.graduationCohort
    };
  };

  // Load graduates from Firestore
  const loadGraduates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const graduatesRef = collection(db, 'graduates');
      const q = query(graduatesRef, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const graduatesList: GraduateCardProps[] = [];
      
      querySnapshot.forEach((doc) => {
        const graduateData = { id: doc.id, ...doc.data() } as Graduate;
        const transformedGraduate = transformGraduateData(graduateData);
        graduatesList.push(transformedGraduate);
      });
      
      console.log('Loaded graduates:', graduatesList); // Debug log
      setGraduates(graduatesList);
      setFilteredGraduates(graduatesList);
    } catch (err) {
      console.error('Error loading graduates:', err);
      setError('Failed to load graduate profiles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load graduates on component mount
  useEffect(() => {
    loadGraduates();
  }, []);

  // Memoize the search function to prevent unnecessary re-renders
  const handleSearch = useCallback((filters: FilterOptions) => {
    console.log('Applying filters:', filters); // Debug log
    
    const filtered = graduates.filter(graduate => {
      // Keyword search - check name, title, and tech stack
      const matchKeyword = !filters.keyword || 
        graduate.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        graduate.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        graduate.techStack.some(tech => 
          tech.toLowerCase().includes(filters.keyword!.toLowerCase())
        );
      
      // Tech stack filter - check if graduate has any of the selected skills
      const matchTechStack = filters.techStack.length === 0 || 
        filters.techStack.some(tech => 
          graduate.techStack.some(gradTech =>
            gradTech.toLowerCase().includes(tech.toLowerCase())
          )
        );
      
      // Location filter
      const matchLocation = !filters.location || 
        graduate.location.toLowerCase().includes(filters.location.toLowerCase());

      // Role filter - exact match for role/title
      const matchRole = !filters.role || 
        graduate.title.toLowerCase() === filters.role.toLowerCase();

      // Graduation cohort filter
      const matchCohort = !filters.graduationCohort || 
        (graduate.graduationCohort && 
         graduate.graduationCohort.toLowerCase().includes(filters.graduationCohort.toLowerCase()));

      const result = matchKeyword && matchTechStack && matchLocation && matchRole && matchCohort;
      
      // Debug log for troubleshooting (remove in production)
      if (filters.keyword || filters.techStack.length > 0 || filters.location || filters.role || filters.graduationCohort) {
        console.log(`Graduate ${graduate.name}:`, {
          matchKeyword,
          matchTechStack,
          matchLocation,
          matchRole,
          matchCohort,
          result,
          graduate: {
            name: graduate.name,
            title: graduate.title,
            location: graduate.location,
            techStack: graduate.techStack,
            cohort: graduate.graduationCohort
          }
        });
      }
      
      return result;
    });

    console.log(`Filtered ${filtered.length} out of ${graduates.length} graduates`);
    setFilteredGraduates(filtered);
  }, [graduates]);

  // Get unique values for filter options
  const getFilterOptions = useCallback(() => {
    const roles = [...new Set(graduates.map(g => g.title))].sort();
    const cohorts = [...new Set(graduates.map(g => g.graduationCohort).filter(Boolean))].sort().reverse() as string[];
    const allSkills = [...new Set(graduates.flatMap(g => g.techStack))].sort();
    const locations = [...new Set(graduates.map(g => g.location))].sort();

    console.log('Filter options:', { roles, cohorts, allSkills, locations }); // Debug log

    return {
      roles,
      cohorts,
      skills: allSkills,
      locations
    };
  }, [graduates]);

  // Retry loading graduates
  const handleRetry = () => {
    loadGraduates();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary">
            Graduate Directory
          </h1>
          <p className="text-muted-foreground mt-2">
            Find talented graduates ready to make an impact
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading graduate profiles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary">
            Graduate Directory
          </h1>
          <p className="text-muted-foreground mt-2">
            Find talented graduates ready to make an impact
          </p>
        </div>
        
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={handleRetry}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filterOptions = getFilterOptions();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">
          Graduate Directory
        </h1>
        <p className="text-muted-foreground mt-2">
          Find talented graduates ready to make an impact
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
          <span>{graduates.length} graduate{graduates.length !== 1 ? 's' : ''} total</span>
          {filterOptions.roles.length > 0 && (
            <span>• {filterOptions.roles.length} different roles</span>
          )}
          {filterOptions.cohorts.length > 0 && (
            <span>• {filterOptions.cohorts.length} cohorts represented</span>
          )}
          {filterOptions.skills.length > 0 && (
            <span>• {filterOptions.skills.length} unique skills</span>
          )}
        </div>
      </div>

      <SearchFilter 
        onSearch={handleSearch}
        availableRoles={filterOptions.roles}
        availableCohorts={filterOptions.cohorts}
        availableSkills={filterOptions.skills}
        availableLocations={filterOptions.locations}
      />

      <div className="mt-8">
        {filteredGraduates.length > 0 && (
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredGraduates.length} of {graduates.length} graduates
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGraduates.map(graduate => (
            <GraduateProfileCard 
              key={graduate.id}
              {...graduate}
            />
          ))}
        </div>
      </div>

      {filteredGraduates.length === 0 && graduates.length > 0 && (
        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-lg mb-2">No graduates match your search criteria.</p>
          <p className="text-sm">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {graduates.length === 0 && !loading && (
        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-lg mb-2">No graduate profiles found.</p>
          <p className="text-sm">Be the first to create a profile!</p>
        </div>
      )}
    </div>
  );
};

export default BrowseGraduatesPage;