import React, { useState } from 'react';
import SearchFilter from '@/components/SearchFilter';
import GraduateProfileCard from '@/components/GraduateProfileCard';

// Mock data - replace with actual data source later
const mockGraduates = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Full Stack Developer',
    location: 'Chapel Hill, NC',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
    techStack: ['React', 'Node.js', 'TypeScript'],
    githubUrl: 'https://github.com/example',
    linkedinUrl: 'https://linkedin.com/in/example',
    websiteUrl: 'https://portfolio.com',
    email: 'sarah@example.com'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Frontend Engineer',
    location: 'Durham, NC', 
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    techStack: ['React', 'Tailwind', 'GraphQL'],
    githubUrl: 'https://github.com/example2',
    linkedinUrl: 'https://linkedin.com/in/example2',
    websiteUrl: 'https://portfolio2.com',
    email: 'michael@example.com'
  }
];

const BrowseGraduatesPage = () => {
  const [graduates, setGraduates] = useState(mockGraduates);
  const [filteredGraduates, setFilteredGraduates] = useState(mockGraduates);

  const handleSearch = (filters) => {
    // Simple filtering logic - will be more complex with backend integration
    const filtered = graduates.filter(graduate => {
      const matchKeyword = filters.keyword ? 
        graduate.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        graduate.techStack.some(tech => 
          tech.toLowerCase().includes(filters.keyword.toLowerCase())
        ) : true;
      
      const matchTechStack = filters.techStack.length > 0 ? 
        filters.techStack.some(tech => 
          graduate.techStack.includes(tech)
        ) : true;
      
      const matchLocation = filters.location ? 
        graduate.location.toLowerCase().includes(filters.location.toLowerCase()) : true;

      return matchKeyword && matchTechStack && matchLocation;
    });

    setFilteredGraduates(filtered);
  };

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

      <SearchFilter onSearch={handleSearch} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGraduates.map(graduate => (
          <GraduateProfileCard 
            key={graduate.id}
            {...graduate}
          />
        ))}
      </div>

      {filteredGraduates.length === 0 && (
        <div className="text-center mt-12 text-muted-foreground">
          No graduates match your search criteria.
        </div>
      )}
    </div>
  );
};

export default BrowseGraduatesPage;
