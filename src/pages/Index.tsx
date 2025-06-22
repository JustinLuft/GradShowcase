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
      <section className="relative text-white overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center">
      {/* Background Image Div */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/src/showcaseHero.jpg')`, // <-- IMPORTANT: Verify this path
        }}
      >
        {/* Overlay to darken image for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
        
        {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Graduate Showcase
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-white leading-relaxed">
          Build Carolina envisions a thriving, accessible tech talent ecosystem in South Carolina. The Graduate Showcase portal offers a bridge between employers and graduates, to connect and find opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isLoggedIn && (
            <button
              onClick={() => (window.location.href = '/create-profile')}
              className="border-2 border-hotPink text-hotPink hover:bg-hotPinkHover hover:text-white hover:border-hotPinkHover px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Manage Profile
            </button>
          )}
          <button
            onClick={() => (window.location.href = '/graduates')}
            className="bg-hotPink hover:bg-hotPinkHover text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Browse Graduates
          </button>
        </div>
      </div>
    </section>

  

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-gray-100 bg-white rounded-lg shadow-sm group transition-colors custom-hover-border">
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group custom-hover-bg" style={{ backgroundColor: '#E93679' }}>
                  <Code className="w-8 h-8 text-[#ffffff]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Showcase Your Skills</h3>
                <p className="text-darkBlue-600 mb-4">
                  <b>You're more than a GPA.</b> Build a compelling profile with projects, portfolios, and certifications to show employers what makes you stand out.
                </p>
                <div className="flex justify-center space-x-2 opacity-80">
                  <div className="w-2 h-2 bg-mediumBlue rounded-full"></div>
                  <div className="w-2 h-2 bg-hotPink rounded-full"></div>
                  <div className="w-2 h-2 bg-darkBlue rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-100 bg-white rounded-lg shadow-sm group transition-colors custom-hover-border">
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group custom-hover-bg" style={{ backgroundColor: '#E93679' }}>
                  <Search className="w-8 h-8 text-[#ffffff]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Get Discovered</h3>
                <p className="text-darkBlue-600 mb-4">
                  <b>Put your name out there.</b> Join our talent directory to gain visibility with local companies looking to hire local graduates with your unique talents.
                </p>
                <div className="flex justify-center space-x-2 opacity-80">
                  <div className="w-2 h-2 bg-mediumBlue rounded-full"></div>
                  <div className="w-2 h-2 bg-hotPink rounded-full"></div>
                  <div className="w-2 h-2 bg-darkBlue rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-100 bg-white rounded-lg shadow-sm group transition-colors custom-hover-border">
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors group custom-hover-bg" style={{ backgroundColor: '#E93679' }}>
                  <Building className="w-8 h-8 text-[#ffffff]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Connect with Local Talent</h3>
                <p className="text-darkBlue-600 mb-4">
                  <b>Find your perfect fit.</b> Search our directory to find fresh talent based on your company's location, job needs, skill requirements, and culture fit — no more endless searching.
                </p>
                <div className="flex justify-center space-x-2 opacity-80">
                  <div className="w-2 h-2 bg-mediumBlue rounded-full"></div>
                  <div className="w-2 h-2 bg-hotPink rounded-full"></div>
                  <div className="w-2 h-2 bg-darkBlue rounded-full"></div>
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
            <button onClick={() => window.location.href = '/graduates'} 
                    className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium flex items-center gap-2">
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
      <footer className="bg-lightBlue py-12 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-darkBlue text-sm">
            © 2025 Build Carolina Graduate Showcase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
