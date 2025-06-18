import React, { useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebase';
import { User, MapPin, Mail, Github, Linkedin, Globe, Code, Calendar, Camera, CheckCircle, AlertCircle } from 'lucide-react';

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  profileImage: string;
  role: string;
  graduationCohort: string;
  skillTags: string[];
}

const CreateProfilePage: React.FC = () => {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    bio: '',
    location: '',
    email: auth.currentUser?.email || '',
    linkedin: '',
    github: '',
    website: '',
    profileImage: '',
    role: '',
    graduationCohort: '',
    skillTags: []
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const suggestedSkills = [
    'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++', 'C#', 
    'PHP', 'Ruby', 'Go', 'Rust', 'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'SASS', 'MongoDB', 
    'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'GraphQL', 'Redux', 'Express', 'Django', 
    'Flask', 'Spring Boot', 'Laravel', 'Rails', 'Git', 'Linux', 'DevOps', 'CI/CD', 'Jest', 'Cypress'
  ];

  // Can update to include any other roles
  const roleOptions = [
    'Frontend Developer',
    'Backend Developer', 
    'Full Stack Developer',
    'Data Analyst',
    'UI/UX Designer',
  ];

  const cohortOptions = [
    '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'
  ];

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skillTags.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillTags: [...prev.skillTags, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skillTags: prev.skillTags.filter(skill => skill !== skillToRemove)
    }));
  };

  const addSuggestedSkill = (skill: string) => {
    if (!formData.skillTags.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skillTags: [...prev.skillTags, skill]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation
    if (!formData.name.trim() || !formData.bio.trim() || !formData.location.trim() || 
        !formData.role || !formData.graduationCohort || formData.skillTags.length === 0) {
      setMessage('Please fill in all required fields and add at least one skill.');
      setIsLoading(false);
      return;
    }

    try {
      const profileData = {
        ...formData,
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        isVerified: false, // Admin will verify
        status: 'pending', // Add status field for admin review
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: auth.currentUser?.uid || ''
      };

      await addDoc(collection(db, 'graduates'), profileData);
      
      setIsSuccess(true);
      setMessage('Profile submitted successfully! Your submission has been sent to administrators for review. You will be notified once your profile is approved and published to the showcase.');
      
      // Reset form
      setFormData({
        name: '',
        bio: '',
        location: '',
        email: auth.currentUser?.email || '',
        linkedin: '',
        github: '',
        website: '',
        profileImage: '',
        role: '',
        graduationCohort: '',
        skillTags: []
      });
      
    } catch (error: any) {
      setMessage('Error submitting profile: ' + error.message);
      console.error('Error submitting profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Submit Your Profile</h1>
            <p className="text-xl opacity-90">
              Apply to join the Carolina Graduate Showcase
            </p>
            <div className="mt-4 flex items-center justify-center text-sm opacity-80">
              <AlertCircle className="mr-2" size={16} />
              <span>All submissions are reviewed by administrators before publication</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="mr-2 text-pink-600" size={24} />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <div className="relative">
                  <Camera className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    value={formData.profileImage}
                    onChange={(e) => handleInputChange('profileImage', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Code className="mr-2 text-pink-600" size={24} />
              Professional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role/Title *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your role</option>
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Cohort *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select
                    value={formData.graduationCohort}
                    onChange={(e) => handleInputChange('graduationCohort', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select graduation year</option>
                    {cohortOptions.map(year => (
                      <option key={year} value={year}>Class of {year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio/About *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Tell us about yourself, your experience, interests, and what you're passionate about..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters recommended
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Code className="mr-2 text-pink-600" size={24} />
              Skills & Technologies *
            </h2>
            
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Add a skill (press Enter)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-medium"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Current Skills */}
            {formData.skillTags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Your Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skillTags.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-pink-600 hover:text-pink-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Skills */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills
                  .filter(skill => !formData.skillTags.includes(skill))
                  .slice(0, 20)
                  .map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSuggestedSkill(skill)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Social Links</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Profile
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="mr-3 mt-0.5 text-blue-600 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Review Process</p>
                  <p>Your profile submission will be reviewed by administrators before being published to the showcase. This helps ensure quality and appropriate content for all visitors.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white'
              }`}
            >
              {isLoading ? 'Submitting for Approval...' : 'Submit for Approval'}
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-lg flex items-center ${
                isSuccess 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {isSuccess && <CheckCircle className="mr-2 flex-shrink-0" size={20} />}
                <p className="text-sm">{message}</p>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600 text-sm">
            © 2025 Build Carolina Graduate Showcase. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;