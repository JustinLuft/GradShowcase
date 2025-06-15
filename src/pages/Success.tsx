import React from 'react';
import { Quote, ArrowRight, Briefcase, GraduationCap, Users, Building, Star, Calendar, MapPin, TrendingUp } from 'lucide-react';

const Success = () => {
  const graduateStories = [
    {
      id: 1,
      name: "Sarah Johnson",
      jobTitle: "Full Stack Developer",
      company: "TechFlow Solutions",
      image: "SJ",
      story: "Build Carolina connected me with my dream job. The platform looks through my grad school years and connected me with a company that truly values innovation.",
      quote: "Build Carolina connected me with my dream job through innovative matching.",
      gradient: "from-blue-400 to-blue-600",
      hireDate: "2024-08-15",
      location: "Charleston, SC",
      previousRole: "Computer Science Graduate",
      salary: "$75,000"
    },
    {
      id: 2,
      name: "Marcus Williams",
      jobTitle: "UX Designer",
      company: "Creative Digital",
      image: "MW",
      story: "I was starting to think I would have to move out of state to find the career I wanted. Build Carolina was able to get hired by a local company that fits perfectly.",
      quote: "Build Carolina helped me find my perfect local opportunity without leaving South Carolina.",
      gradient: "from-purple-400 to-purple-600",
      hireDate: "2024-09-22",
      location: "Columbia, SC",
      previousRole: "Graphic Design Graduate",
      salary: "$68,000"
    },
    {
      id: 3,
      name: "Emily Chen",
      jobTitle: "Software Engineer",
      company: "Innovation Labs",
      image: "EC",
      story: "Networking is highly important to finding your first job after college. The platform showcases students and is to be found by great companies easily.",
      quote: "The platform made it easy for great companies to discover my skills and potential.",
      gradient: "from-pink-400 to-pink-600",
      hireDate: "2024-07-10",
      location: "Greenville, SC",
      previousRole: "Software Engineering Graduate",
      salary: "$82,000"
    }
  ];

  const employerStories = [
    {
      id: 1,
      name: "David Rodriguez",
      title: "Hiring Manager",
      company: "TechFlow Solutions",
      industry: "Technology",
      image: "DR",
      story: "Finding qualified candidates was a challenge until we discovered Build Carolina. The platform provides a comprehensive view of each candidate's skills and projects.",
      quote: "Build Carolina transformed our hiring process with access to exceptional local talent.",
      gradient: "from-green-400 to-green-600",
      hiredCount: 8,
      timeToHire: "3 weeks",
      satisfaction: 5
    },
    {
      id: 2,
      name: "Jennifer Martinez",
      title: "HR Director",
      company: "Creative Digital",
      industry: "Design & Marketing",
      image: "JM",
      story: "We've made multiple incredible hires through Build Carolina. The quality of candidates is consistently impressive and they integrate well into our team culture.",
      quote: "The quality of candidates from Build Carolina consistently exceeds our expectations.",
      gradient: "from-orange-400 to-orange-600",
      hiredCount: 12,
      timeToHire: "2 weeks",
      satisfaction: 5
    },
    {
      id: 3,
      name: "Robert Thompson",
      title: "CEO",
      company: "Innovation Labs",
      industry: "Software Development",
      image: "RT",
      story: "As a growing startup, finding the right talent is crucial. Build Carolina has been instrumental in helping us discover fresh perspectives and innovative thinking.",
      quote: "Build Carolina connects us with the innovative minds that drive our company forward.",
      gradient: "from-indigo-400 to-indigo-600",
      hiredCount: 15,
      timeToHire: "4 weeks",
      satisfaction: 5
    }
  ];

  const stats = [
    { label: "Successful Placements", value: "450+", icon: Briefcase },
    { label: "Partner Companies", value: "120+", icon: Building },
    { label: "Graduate Success Rate", value: "92%", icon: TrendingUp },
    { label: "Average Time to Hire", value: "3 weeks", icon: Calendar }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23374151" width="1200" height="600"/><g opacity="0.8"><circle cx="300" cy="200" r="100" fill="%234B5563"/><circle cx="800" cy="350" r="120" fill="%234B5563"/><circle cx="1000" cy="150" r="80" fill="%234B5563"/></g></svg>')`
          }}
        ></div>
        
        <div className="relative container max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Real Journeys, Real Results
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                Discover the inspiring journeys of graduates who found their dream careers and employers who discovered exceptional talent through Build Carolina. These are the authentic stories of connections that lead to lasting success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href = '/create-profile'}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Share Your Story
                </button>
                <button
                  onClick={() => window.location.href = '/graduates'}
                  className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Find Talent
                </button>
              </div>
            </div>
            
            {/* Hero Image Area */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Success Story</h3>
                      <p className="text-sm text-gray-500">Graduate → Career</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-gradient-to-r from-pink-200 to-pink-400 rounded-full"></div>
                    <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full w-4/5"></div>
                    <div className="h-2 bg-gradient-to-r from-green-200 to-green-400 rounded-full w-3/5"></div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>92% Success Rate</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-pink-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduate Success Stories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Inspiring Graduate Journeys</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear directly from the graduates who leveraged Build Carolina to launch impactful careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {graduateStories.map((story) => (
              <div key={story.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg group hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      {story.image}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{story.name}</h3>
                    <p className="text-pink-600 font-medium mb-1">{story.jobTitle}</p>
                    <p className="text-sm text-gray-500 mb-2">{story.company}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{story.location}</span>
                      <Calendar className="w-3 h-3 ml-2" />
                      <span>Hired {formatDate(story.hireDate)}</span>
                    </div>
                  </div>

                  <div className="relative bg-gray-50 rounded-lg p-4 mb-4">
                    <Quote className="absolute top-2 left-2 w-4 h-4 text-pink-400" />
                    <p className="text-gray-700 text-sm italic pl-6 leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {story.story}
                  </p>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Previous: {story.previousRole}</span>
                      <span>Starting: {story.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Success Stories */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Employers Find Their Perfect Fit</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Leading companies share how Build Carolina helped them discover and hire top local talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employerStories.map((story) => (
              <div key={story.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg group hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform`}>
                      {story.image}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{story.name}</h3>
                    <p className="text-pink-600 font-medium mb-1">{story.title}</p>
                    <p className="text-sm text-gray-500 mb-2">{story.company}</p>
                    <p className="text-xs text-gray-500">[{story.industry}]</p>
                  </div>

                  <div className="relative bg-gray-50 rounded-lg p-4 mb-4">
                    <Quote className="absolute top-2 left-2 w-4 h-4 text-pink-400" />
                    <p className="text-gray-700 text-sm italic pl-6 leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {story.story}
                  </p>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Hires Made:</span> {story.hiredCount}
                      </div>
                      <div>
                        <span className="font-medium">Avg. Time:</span> {story.timeToHire}
                      </div>
                      <div className="col-span-2 flex items-center gap-1">
                        <span className="font-medium">Satisfaction:</span>
                        {[...Array(story.satisfaction)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the hundreds of graduates and employers who have found their perfect match through Build Carolina.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/create-profile'}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              I'm a Graduate
            </button>
            <button
              onClick={() => window.location.href = '/employers'}
              className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Building className="w-4 h-4" />
              I'm an Employer
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

export default Success;