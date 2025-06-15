import React from 'react';
import { GraduationCap, Code, Users, Briefcase, ArrowRight, Search, MapPin, Building } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust path if needed

const IndexPage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23374151" width="1200" height="600"/><g opacity="0.8"><circle cx="300" cy="200" r="100" fill="%234B5563"/><circle cx="800" cy="350" r="120" fill="%234B5563"/><circle cx="1000" cy="150" r="80" fill="%234B5563"/></g></svg>')`
          }}
        ></div>
        
        <div className="relative container max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Graduate Showcase
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                Build Carolina envisions a thriving, accessible tech ecosystem in South Carolina. The Graduate Showcase portal offers a bridge between employers and graduates, to connect and find opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isLoggedIn && (
                  <button 
                    onClick={() => window.location.href = '/create-profile'}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                  >
                    Manage Profile
                  </button>
                )}
                <button
                  onClick={() => window.location.href = '/graduates'}
                  className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Browse Graduates
                </button>
              </div>
            </div>
            
            {/* Mockup image area */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <GraduationCap className="w-12 h-12 text-blue-600 z-10" />
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 left-2 w-4 h-4 bg-blue-300 rounded-full"></div>
                      <div className="absolute top-6 right-4 w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="absolute bottom-4 left-6 w-3 h-3 bg-blue-300 rounded-full"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-white/60 rounded-full w-3/4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-3 bg-white/40 rounded-full w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer animation-delay-200"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-pink-200 rounded-full w-16 flex items-center justify-center">
                      <span className="text-xs text-pink-700 font-medium">React</span>
                    </div>
                    <div className="h-6 bg-blue-200 rounded-full w-16 flex items-center justify-center">
                      <span className="text-xs text-blue-700 font-medium">Node</span>
                    </div>
                    <div className="h-6 bg-green-200 rounded-full w-16 flex items-center justify-center">
                      <span className="text-xs text-green-700 font-medium">Python</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-gray-100 bg-white rounded-lg shadow-sm group transition-colors custom-hover-border">
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group custom-hover-bg" style={{ backgroundColor: '#A3B5C1' }}>
                  <Code className="w-8 h-8 text-[#354866]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Showcase Your Skills</h3>
                <p className="text-gray-600 mb-4">
                  You're more than a GPA. Build a compelling profile with projects, portfolios, and certifications to show employers what makes you stand out.
                </p>
                <div className="flex justify-center space-x-2 opacity-60">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-100 bg-white rounded-lg shadow-sm group transition-colors custom-hover-border">
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group custom-hover-bg" style={{ backgroundColor: '#A3B5C1' }}>
                  <Search className="w-8 h-8 text-[#354866]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Get Discovered</h3>
                <p className="text-gray-600 mb-4">
                  Put your name out there. Join our talent directory to gain visibility with local companies looking to hire local graduates with your unique talents.
                </p>
                <div className="flex justify-center space-x-2 opacity-60">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-100 bg-white rounded-lg shadow-sm group transition-colors custom-hover-border">
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group custom-hover-bg" style={{ backgroundColor: '#A3B5C1' }}>
                  <Building className="w-8 h-8 text-[#354866]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Connect with Local Talent</h3>
                <p className="text-gray-600 mb-4">
                  Find your perfect fit. Search our directory to find fresh talent based on your company's location, job needs, skill requirements, and culture fit — no more endless searching.
                </p>
                <div className="flex justify-center space-x-2 opacity-60">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Graduates Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Graduates</h2>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg group hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                      {['G', 'A', 'S', 'M'][i]}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {['Graduate Name', 'Alex Johnson', 'Sarah Miller', 'Mike Chen'][i]}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {['Job Title', 'Full Stack Developer', 'UX Designer', 'Data Scientist'][i]}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {i === 0 && (
                        <>
                          <span className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-2 py-1 rounded-full text-xs font-medium">React</span>
                          <span className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-2 py-1 rounded-full text-xs font-medium">Node.js</span>
                          <span className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-2 py-1 rounded-full text-xs font-medium">Python</span>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <span className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-full text-xs font-medium">JavaScript</span>
                          <span className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-full text-xs font-medium">MongoDB</span>
                          <span className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-full text-xs font-medium">AWS</span>
                        </>
                      )}
                      {i === 2 && (
                        <>
                          <span className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded-full text-xs font-medium">Figma</span>
                          <span className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded-full text-xs font-medium">Adobe XD</span>
                          <span className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded-full text-xs font-medium">Sketch</span>
                        </>
                      )}
                      {i === 3 && (
                        <>
                          <span className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded-full text-xs font-medium">Python</span>
                          <span className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded-full text-xs font-medium">TensorFlow</span>
                          <span className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded-full text-xs font-medium">SQL</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

export default IndexPage;
