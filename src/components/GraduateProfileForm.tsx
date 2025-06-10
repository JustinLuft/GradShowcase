import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, MapPin, Mail, Globe, Upload, CheckCircle, X } from 'lucide-react';

import { auth, db } from '@/firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  email: z.string().email('Invalid email address'),
  linkedin: z.string().url('Invalid LinkedIn URL'),
  github: z.string().url('Invalid GitHub URL'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  role: z.string().min(2, 'Role/Title is required'),
  graduationCohort: z.string().min(1, 'Graduation cohort is required'),
  skillTags: z.array(z.string()).min(1, 'At least one skill is required'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileData extends ProfileFormValues {
  profileImage?: string;
  updatedAt?: string;
  createdAt?: string;
}

// Common skill tags
const COMMON_SKILLS = [
  'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'Node.js',
  'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS', 'SCSS',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker',
  'GraphQL', 'REST API', 'Git', 'Linux', 'Ubuntu', 'Redux',
  'Next.js', 'Express.js', 'Django', 'Flask', 'Spring Boot',
  'React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin',
  'Data Analysis', 'Machine Learning', 'AI', 'DevOps', 'CI/CD',
  'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions',
  'UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator'
];

// Common roles
const COMMON_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'DevOps Engineer',
  'Data Analyst',
  'Data Scientist',
  'Machine Learning Engineer',
  'UI/UX Designer',
  'Product Manager',
  'QA Engineer',
  'Software Engineer',
  'Cloud Engineer',
  'Cybersecurity Specialist'
];

// Generate cohort options (last 5 years + current year)
const generateCohortOptions = () => {
  const currentYear = new Date().getFullYear();
  const cohorts = [];
  
  for (let year = currentYear; year >= currentYear - 5; year--) {
    cohorts.push(`${year}`);
    cohorts.push(`${year} Spring`);
    cohorts.push(` ${year} Fall`);
  }
  
  return cohorts.sort().reverse();
};

export default function GraduateProfileForm() {
  const [profileImage, setProfileImage] = useState<string>('https://images.unsplash.com/photo-1507679799987-c73779587ccf');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileExists, setProfileExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [skillInput, setSkillInput] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      bio: '',
      location: '',
      email: '',
      linkedin: '',
      github: '',
      website: '',
      role: '',
      graduationCohort: '',
      skillTags: [],
    },
  });

  // Load existing profile data
  const loadExistingProfile = async (userId: string) => {
    try {
      const docRef = doc(db, 'graduates', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const profileData = docSnap.data() as ProfileData;
        setProfileExists(true);
        
        // Auto-fill form with existing data
        form.reset({
          name: profileData.name || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          email: profileData.email || '',
          linkedin: profileData.linkedin || '',
          github: profileData.github || '',
          website: profileData.website || '',
          role: profileData.role || '',
          graduationCohort: profileData.graduationCohort || '',
          skillTags: profileData.skillTags || [],
        });
        
        setSelectedSkills(profileData.skillTags || []);
        
        if (profileData.profileImage) {
          setProfileImage(profileData.profileImage);
        }
      } else {
        setProfileExists(false);
        setIsEditing(true); // Allow editing for new profiles
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfileExists(false);
      setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        loadExistingProfile(user.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Update form when selected skills change
  useEffect(() => {
    form.setValue('skillTags', selectedSkills);
  }, [selectedSkills, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!currentUser) {
      alert('You must be logged in to save your profile.');
      return;
    }

    const profileData: ProfileData = {
      ...values,
      profileImage,
      updatedAt: new Date().toISOString(),
      ...(profileExists ? {} : { createdAt: new Date().toISOString() })
    };

    try {
      await setDoc(doc(db, 'graduates', currentUser.uid), profileData);
      alert(profileExists ? 'Profile updated successfully!' : 'Profile created successfully!');
      setProfileExists(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      setSelectedSkills([...selectedSkills, trimmedSkill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-2xl py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container max-w-2xl py-8">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p>Please log in to create or edit your graduate profile.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold">
          {profileExists ? 'My Graduate Profile' : 'Create Graduate Profile'}
        </h1>
        {profileExists && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Profile Complete</span>
          </div>
        )}
      </div>
      
      <Card className="p-6">
        {profileExists && !isEditing && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              Your profile has been created! You can edit it anytime by clicking the "Edit Profile" button below.
            </p>
          </div>
        )}

        <div className="mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0">
                <label htmlFor="profile-image" className="cursor-pointer">
                  <div className="bg-secondary hover:bg-secondary/90 text-white p-2 rounded-full">
                    <Upload className="w-4 h-4" />
                  </div>
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      disabled={!isEditing}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role/Title</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMMON_ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graduationCohort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Cohort</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cohort" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {generateCohortOptions().map((cohort) => (
                          <SelectItem key={cohort} value={cohort}>
                            {cohort}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="skillTags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills & Technologies</FormLabel>
                  <FormDescription>
                    Add your technical skills. Type and press Enter, or click from suggestions.
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-3">
                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill..."
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={handleSkillInputKeyPress}
                          />
                          <Button
                            type="button"
                            onClick={() => addSkill(skillInput)}
                            disabled={!skillInput.trim()}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                      
                      {selectedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-sm">
                              {skill}
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="ml-2 hover:text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {isEditing && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Common skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {COMMON_SKILLS.filter(skill => !selectedSkills.includes(skill))
                              .slice(0, 15).map((skill) => (
                              <Button
                                key={skill}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addSkill(skill)}
                                className="text-xs"
                              >
                                + {skill}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormDescription>
                    Tell us about yourself, your experience, and what you're passionate about.
                  </FormDescription>
                  <FormControl>
                    <Textarea 
                      placeholder="I'm a passionate developer with experience in..."
                      className="min-h-[120px]"
                      disabled={!isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-9" 
                          placeholder="City, Country" 
                          disabled={!isEditing}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-9" 
                          placeholder="your@email.com" 
                          disabled={!isEditing}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-9" 
                          placeholder="https://linkedin.com/in/..." 
                          disabled={!isEditing}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Profile</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-9" 
                          placeholder="https://github.com/..." 
                          disabled={!isEditing}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Website (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-9" 
                          placeholder="https://your-website.com" 
                          disabled={!isEditing}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              {profileExists && !isEditing ? (
                <Button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  className="bg-accent hover:bg-accent/90"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  {profileExists && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        loadExistingProfile(currentUser.uid); // Reload original data
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" className="bg-accent hover:bg-accent/90">
                    {profileExists ? 'Update Profile' : 'Create Profile'}
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}