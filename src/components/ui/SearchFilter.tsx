import React, { useState } from 'react';
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
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (filters: FilterState) => void;
}

interface FilterState {
  keyword: string;
  techStack: string[];
  role: string;
  location: string;
  cohort: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    techStack: [],
    role: '',
    location: '',
    cohort: '',
  });

  const [techInput, setTechInput] = useState('');

  const techOptions = [
    'React', 'Python', 'JavaScript', 'TypeScript', 'Node.js',
    'SQL', 'MongoDB', 'AWS', 'Docker', 'Git'
  ];

  const roleOptions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'DevOps Engineer'
  ];

  const handleAddTech = (tech: string) => {
    if (!filters.techStack.includes(tech)) {
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

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-border/20 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, skills, or projects..."
            className="pl-10"
            value={filters.keyword}
            onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          value={filters.role}
          onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        />

        <Select
          value={filters.cohort}
          onValueChange={(value) => setFilters(prev => ({ ...prev, cohort: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Graduation Cohort" />
          </SelectTrigger>
          <SelectContent>
            {['2024', '2023', '2022'].map((year) => (
              <SelectItem key={year} value={year}>Class of {year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add tech stack..."
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
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tech}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRemoveTech(tech)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setFilters({
            keyword: '',
            techStack: [],
            role: '',
            location: '',
            cohort: '',
          })}
        >
          Clear
        </Button>
        <Button onClick={() => onSearch(filters)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
