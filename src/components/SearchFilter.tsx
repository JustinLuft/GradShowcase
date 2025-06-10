import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOptions {
  keyword?: string;
  techStack: string[];
  location?: string;
  role?: string;
  graduationCohort?: string;
}

interface SearchFilterProps {
  onSearch: (filters: FilterOptions) => void;
  availableRoles: string[];
  availableCohorts: string[];
  availableSkills: string[];
  availableLocations: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  onSearch,
  availableRoles,
  availableCohorts,
  availableSkills,
  availableLocations 
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    keyword: '',
    techStack: [],
    location: '',
    role: '',
    graduationCohort: '',
  });

  const [techInput, setTechInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-trigger search when filters change
  useEffect(() => {
    onSearch(filters);
  }, [filters, onSearch]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddTech = (tech: string) => {
    if (tech && !filters.techStack.includes(tech)) {
      setFilters(prev => ({
        ...prev,
        techStack: [...prev.techStack, tech]
      }));
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    setFilters(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: '',
      techStack: [],
      location: '',
      role: '',
      graduationCohort: '',
    });
    setTechInput('');
  };

  const hasActiveFilters = filters.keyword || 
    filters.techStack.length > 0 || 
    filters.location || 
    filters.role || 
    filters.graduationCohort;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-border/20 p-4 space-y-4">
      {/* Main Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, skills, or projects..."
            className="pl-10"
            value={filters.keyword || ''}
            onChange={(e) => handleFilterChange('keyword', e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearAllFilters} className="text-sm">
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Role Filter */}
            <Select
              value={filters.role || ''}
              onValueChange={(value) => handleFilterChange('role', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {availableRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select
              value={filters.location || ''}
              onValueChange={(value) => handleFilterChange('location', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {availableLocations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Graduation Cohort Filter */}
            <Select
              value={filters.graduationCohort || ''}
              onValueChange={(value) => handleFilterChange('graduationCohort', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Graduation Cohort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cohorts</SelectItem>
                {availableCohorts.map((cohort) => (
                  <SelectItem key={cohort} value={cohort}>
                    {cohort.includes('Class of') ? cohort : `Class of ${cohort}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tech Stack Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Skills & Technologies</label>
            <div className="flex items-center gap-2">
              <Select
                value=""
                onValueChange={(value) => {
                  if (value && value !== 'custom') {
                    handleAddTech(value);
                  }
                }}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select from available skills..." />
                </SelectTrigger>
                <SelectContent>
                  {availableSkills
                    .filter(skill => !filters.techStack.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  <SelectItem value="custom">+ Add custom skill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Tech Input */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Or type custom skill..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && techInput.trim()) {
                    handleAddTech(techInput.trim());
                  }
                }}
              />
              <Button
                variant="secondary"
                onClick={() => techInput.trim() && handleAddTech(techInput.trim())}
                disabled={!techInput.trim()}
              >
                Add
              </Button>
            </div>

            {/* Selected Tech Stack */}
            {filters.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTech(tech)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-gray-50 rounded-md p-3 border-t">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Active filters: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {filters.keyword && (
                <Badge variant="outline" className="text-xs">
                  Search: "{filters.keyword}"
                </Badge>
              )}
              {filters.role && (
                <Badge variant="outline" className="text-xs">
                  Role: {filters.role}
                </Badge>
              )}
              {filters.location && (
                <Badge variant="outline" className="text-xs">
                  Location: {filters.location}
                </Badge>
              )}
              {filters.graduationCohort && (
                <Badge variant="outline" className="text-xs">
                  Cohort: {filters.graduationCohort}
                </Badge>
              )}
              {filters.techStack.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {filters.techStack.length} skill{filters.techStack.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;