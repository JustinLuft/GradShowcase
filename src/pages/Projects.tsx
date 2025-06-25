import React from 'react';
import { Code, ExternalLink, Github, Calendar, User, Filter, Search, ArrowRight, Star, Eye, GitBranch } from 'lucide-react';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and real-time inventory management.",
      author: "Alex Johnson",
      authorInitial: "A",
      date: "2024-12-15",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      githubUrl: "https://github.com/example/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      stars: 24,
      views: 156,
      forks: 8,
      gradient: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "Weather Analytics Dashboard",
      description: "Interactive dashboard for weather data visualization using D3.js and Python Flask. Displays real-time weather patterns and historical climate data.",
      author: "Sarah Miller",
      authorInitial: "S",
      date: "2024-11-28",
      technologies: ["Python", "Flask", "D3.js", "PostgreSQL"],
      category: "Data Science",
      githubUrl: "https://github.com/example/weather-dashboard",
      liveUrl: "https://weather-analytics.com",
      stars: 18,
      views: 89,
      forks: 5,
      gradient: "from-green-400 to-green-600"
    },
    {
      id: 3,
      title: "Mobile Fitness Tracker",
      description: "Cross-platform mobile app for fitness tracking with React Native. Includes workout logging, progress visualization, and social features.",
      author: "Mike Chen",
      authorInitial: "M",
      date: "2024-12-03",
      technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
      category: "Mobile",
      githubUrl: "https://github.com/example/fitness-tracker",
      liveUrl: null,
      stars: 31,
      views: 203,
      forks: 12,
      gradient: "from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "AI Content Generator",
      description: "Machine learning application that generates creative content using natural language processing. Built with Python and TensorFlow.",
      author: "Emma Davis",
      authorInitial: "E",
      date: "2024-11-15",
      technologies: ["Python", "TensorFlow", "FastAPI", "Docker"],
      category: "AI/ML",
      githubUrl: "https://github.com/example/ai-content",
      liveUrl: "https://ai-content-gen.com",
      stars: 42,
      views: 278,
      forks: 15,
      gradient: "from-pink-400 to-pink-600"
    },
    {
      id: 5,
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates, file sharing, and team communication features. Built with Vue.js and Laravel.",
      author: "James Wilson",
      authorInitial: "J",
      date: "2024-12-08",
      technologies: ["Vue.js", "Laravel", "WebSockets", "MySQL"],
      category: "Full Stack",
      githubUrl: "https://github.com/example/task-manager",
      liveUrl: "https://taskflow-app.com",
      stars: 19,
      views: 134,
      forks: 7,
      gradient: "from-orange-400 to-orange-600"
    },
    {
      id: 6,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting platform using blockchain technology. Ensures vote immutability and provides real-time results visualization.",
      author: "Lisa Rodriguez",
      authorInitial: "L",
      date: "2024-10-22",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
      category: "Blockchain",
      githubUrl: "https://github.com/example/blockchain-voting",
      liveUrl: null,
      stars: 67,
      views: 445,
      forks: 23,
      gradient: "from-indigo-400 to-indigo-600"
    }
  ];

  const navigate = (path: string) => window.location.href = path;

  const categories = ['all', 'Full Stack', 'Data Science', 'Mobile', 'AI/ML', 'Blockchain'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || project.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'React': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      'Node.js': 'bg-green-100 text-green-700 hover:bg-green-200',
      'Python': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      'JavaScript': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      'TypeScript': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      'Vue.js': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
      'Laravel': 'bg-red-100 text-red-700 hover:bg-red-200',
      'MongoDB': 'bg-green-100 text-green-700 hover:bg-green-200',
      'PostgreSQL': 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      'Firebase': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      'TensorFlow': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
      'Docker': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    };
    return colors[tech] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Hero Section */}
      <section className="relative text-white overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/src/projectsHero.jpg')` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-white md:text-6xl font-bold mb-4">
            Student Projects
          </h1>
          <p className="text-lg text-white sm:text-xl mb-8">
            Explore innovative projects built by South Carolina graduates. From full-stack applications to AI solutions, discover the creativity and technical skills of our local talent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
	            <button
              onClick={() => navigate('/graduates')}
              className="bg-hotPink hover:bg-hotPinkHover text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Vew Graduate Profiles
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg group hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform`}>
                        {project.authorInitial}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{project.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <User className="w-3 h-3" />
                          <span>{project.author}</span>
                          <Calendar className="w-3 h-3 ml-2" />
                          <span>{formatDate(project.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-pink-100 text-pink-700 text-center px-2 py-1 flex rounded-full text-xs font-medium">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to showcase your project?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of talented developers and share your work with potential employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/create-profile'}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Create Your Profile
            </button>
            <button
              onClick={() => window.location.href = '/graduates'}
              className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Browse All Graduates
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © 2025 Build Carolina Graduate Showcase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;