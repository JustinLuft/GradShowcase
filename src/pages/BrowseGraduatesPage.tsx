import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { X, MapPin, Calendar, Github, Linkedin, Globe, Mail, User, Code, Clock } from "lucide-react";

interface Graduate {
  id: string; name: string; bio: string; location: string; email: string;
  linkedin: string; github: string; website?: string; profileImage?: string;
  role: string; graduationCohort: string; skillTags: string[];
  isVerified?: boolean; createdAt?: string; updatedAt?: string; verifiedAt?: string;
}

interface FilterOptions {
  search: string; techStack: string[]; location: string; role: string; graduationCohort: string;
}

const formatDate = (dateString?: string) => 
  dateString ? new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : 'N/A';

const ProfileModal = ({ graduateData: g, onClose }: { graduateData: Graduate; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      <div className="relative bg-gradient-to-r from-pink-400 to-purple-400 text-white p-6 rounded-t-lg sticky top-0 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
          <X size={24} />
        </button>
        <div className="flex items-center space-x-6">
          <img
            src={g.profileImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf'}
            alt={g.name} className="w-24 h-24 rounded-full object-cover bg-white"
            onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf'}
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{g.name}</h1>
            <p className="text-3xl font-bold mb-2">{g.role}</p>
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <MapPin size={16} /><span>{g.location}</span><span className="mx-2">•</span>
              <Calendar size={16} /><span>Class of {g.graduationCohort}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">

      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 text-pink-600" size={20} />About
          </h2>
          <div className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-wrap break-words overflow-wrap-anywhere">
            {g.bio}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Code className="mr-2 text-pink-600" size={20} />Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {g.skillTags.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact & Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { Icon: Mail, label: "Email", value: g.email, href: `mailto:${g.email}`, color: "text-red-500" },
              ...(g.github ? [{ Icon: Github, label: "GitHub", value: "View Profile", href: g.github, color: "text-gray-800" }] : []),
              ...(g.linkedin ? [{ Icon: Linkedin, label: "LinkedIn", value: "View Profile", href: g.linkedin, color: "text-pink-700" }] : []),
              ...(g.website ? [{ Icon: Globe, label: "Website", value: "Visit Website", href: g.website, color: "text-green-600" }] : [])
            ].map(({ Icon, label, value, href, color }, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Icon className={color} size={20} />
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-medium">
                    {value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-2 text-pink-600" size={20} />Profile Information
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            {[
              ["Profile Created:", formatDate(g.createdAt)],
              ["Last Updated:", formatDate(g.updatedAt)],
              ["Graduation Cohort:", g.graduationCohort]
            ].map(([label, value, className], i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{label}</span>
                <span className={`font-medium ${className || ""}`}>{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

              <div className="relative bg-gradient-to-r from-pink-400 to-purple-400 text-white p-6  sticky top-0 z-10">

          
        </div>
      </div>
    </div>
  </div>
);

const BrowseGraduatesPage = () => {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [filteredGraduates, setFilteredGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '', techStack: [], location: '', role: '', graduationCohort: ''
  });

  const extractFromBio = (bio: string) => {
    const techKeywords = ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'SASS', 'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'GraphQL'];
    const rolePatterns = [
      { keywords: ['frontend', 'front-end'], title: 'Frontend Developer' },
      { keywords: ['backend', 'back-end'], title: 'Backend Developer' },
      { keywords: ['fullstack', 'full-stack'], title: 'Full Stack Developer' },
      { keywords: ['data', 'analyst'], title: 'Data Analyst' },
      { keywords: ['ui', 'ux', 'design'], title: 'UI/UX Designer' }
    ];
    
    const lowerBio = bio.toLowerCase();
    const skills = techKeywords.filter(tech => lowerBio.includes(tech.toLowerCase())).slice(0, 5) || ['Software Development'];
    const role = rolePatterns.find(({ keywords }) => keywords.some(k => lowerBio.includes(k)))?.title || 'Software Developer';
    
    return { skills, role };
  };

  const loadGraduates = async () => {
    try {
      const q = query(collection(db, 'graduates'), where('isVerified', '==', true));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => {
        const data = { id: doc.id, ...doc.data() } as Graduate;
        const { skills, role } = extractFromBio(data.bio);
        return { ...data, role: data.role || role, skillTags: data.skillTags?.length ? data.skillTags : skills };
      }).sort((a, b) => a.name.localeCompare(b.name));
      
      setGraduates(list);
      setFilteredGraduates(list);
    } catch (err) {
      console.error('Error loading graduates:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    const filtered = graduates.filter(g => {
      const searchMatch = !filters.search || [g.name, g.role, g.location, ...g.skillTags]
        .some(field => field.toLowerCase().includes(filters.search.toLowerCase()));
      const skillMatch = filters.techStack.length === 0 || filters.techStack.every(s =>
        g.skillTags.some(gs => gs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(gs.toLowerCase())));
      const locationMatch = !filters.location || g.location.toLowerCase().includes(filters.location.toLowerCase());
      const roleMatch = !filters.role || g.role.toLowerCase() === filters.role.toLowerCase();
      const cohortMatch = !filters.graduationCohort || g.graduationCohort?.toLowerCase().includes(filters.graduationCohort.toLowerCase());
      return searchMatch && skillMatch && locationMatch && roleMatch && cohortMatch;
    });
    setFilteredGraduates(filtered);
  }, [graduates, filters]);

  useEffect(() => { loadGraduates(); }, []);
  useEffect(() => { applyFilters(); }, [applyFilters]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedGraduate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedGraduate]);

  const filterOptions = {
    roles: [...new Set(graduates.map(g => g.role))].sort(),
    cohorts: [...new Set(graduates.map(g => g.graduationCohort).filter(Boolean))].sort().reverse(),
    skills: [...new Set(graduates.flatMap(g => g.skillTags))].sort(),
    locations: [...new Set(graduates.map(g => g.location))].sort()
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => setFilters(prev => ({ ...prev, [key]: value }));
  const toggleSkill = (skill: string) => updateFilter('techStack', 
    filters.techStack.includes(skill) ? filters.techStack.filter(s => s !== skill) : [...filters.techStack, skill]);
  const clearFilters = () => setFilters({ search: '', techStack: [], location: '', role: '', graduationCohort: '' });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading graduate profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-72 flex-shrink-0">
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-white">Filters</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                <input
                  type="text" placeholder="Name, role, location, skills..."
                  value={filters.search}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFilter('search', e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filterOptions.skills.slice(0, 15).map(skill => (
                    <label key={skill} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                      <input type="checkbox" checked={filters.techStack.includes(skill)}
                        className="mr-2 rounded border-slate-600 bg-slate-700 text-blue-500"
                        onChange={() => toggleSkill(skill)} />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              {[
                { key: 'location', label: 'Location', options: filterOptions.locations },
                { key: 'role', label: 'Role', options: filterOptions.roles },
                { key: 'graduationCohort', label: 'Cohort', options: filterOptions.cohorts }
              ].map(({ key, label, options }) => (
                <div key={key} className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                  <select value={filters[key as keyof FilterOptions] as string}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => updateFilter(key as keyof FilterOptions, e.target.value)}>
                    <option value="">All {label}s</option>
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              ))}

              <button onClick={clearFilters}
                className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
                Clear Filters
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Graduate Directory</h1>
              <p className="text-gray-600">Showing {filteredGraduates.length} of {graduates.length} verified graduates</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGraduates.map(g => (
                <div key={g.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-square p-6 flex flex-col items-center justify-center text-center">
                    <img src={g.profileImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf'} 
                      alt={g.name} className="w-20 h-20 rounded-full bg-gray-300 mb-4 object-cover"
                      onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf'} />
                    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{g.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{g.role}</p>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-1">{g.location}</p>
                  </div>
                  
                  <div className="px-4 pb-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {g.skillTags.slice(0, 3).map((skill, i) => (
                        <span key={i} className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{skill}</span>
                      ))}
                      {g.skillTags.length > 3 && (
                        <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">+{g.skillTags.length - 3}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="flex justify-center space-x-3 mb-3">
                      {[
                        { url: g.github, d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z", color: "gray-900" },
                        { url: g.linkedin, d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", color: "blue-600" }
                      ].map(({ url, d, color }, i) => url && (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={`text-gray-600 hover:text-${color}`}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={d}/></svg>
                        </a>
                      ))}
                      {g.website && (
                        <a href={g.website} target="_blank" className="text-gray-600 hover:text-green-600">
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      <a href={`mailto:${g.email}`} className="text-gray-600 hover:text-red-600">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                    <button onClick={() => setSelectedGraduate(g)}
                      className="w-full bg-pink-400 hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredGraduates.length === 0 && graduates.length > 0 && (
              <div className="text-center mt-12 text-gray-600">
                <p className="text-lg mb-2">No graduates match your search criteria.</p>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600 text-sm">© 2025 Build Carolina Graduate Showcase. All rights reserved.</p>
        </div>
      </div>

      {selectedGraduate && <ProfileModal graduateData={selectedGraduate} onClose={() => setSelectedGraduate(null)} />}
    </div>
  );
};

export default BrowseGraduatesPage;