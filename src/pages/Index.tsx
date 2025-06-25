import React, { useEffect, useState } from 'react';
import { Code, Users, ArrowRight, Search, MapPin, Building } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Graduate {
  id: string;
  name: string;
  bio: string;
  location: string;
  role: string;
  skillTags: string[];
  profileImage?: string;
  isVerified: boolean;
}

const GRADIENTS = ['from-pink-400 to-pink-600', 'from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-green-400 to-green-600'];
const SKILL_COLORS = [
  { bg: 'bg-orange-100', text: 'text-orange-700' },
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-green-100', text: 'text-green-700' }
];

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  return parts.length === 1 ? parts[0][0] : parts[0][0] + parts[parts.length - 1][0];
};

const IndexPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [featuredGraduates, setFeaturedGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        setLoading(true);
        // Only fetch verified graduates for featured section
        const graduatesRef = collection(db, 'graduates');
        const verifiedQuery = query(graduatesRef, where('isVerified', '==', true));
        const querySnapshot = await getDocs(verifiedQuery);
        
        const graduates: Graduate[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name && data.bio && data.role && data.skillTags?.length > 0) {
            graduates.push({
              id: doc.id,
              name: data.name,
              bio: data.bio,
              location: data.location || 'Location not specified',
              role: data.role,
              skillTags: Array.isArray(data.skillTags) ? data.skillTags.slice(0, 3) : [],
              profileImage: data.profileImage,
              isVerified: true
            });
          }
        });
        
        // Shuffle and take first 4
        const shuffled = graduates.sort(() => 0.5 - Math.random()).slice(0, 4);
        setFeaturedGraduates(shuffled);
      } catch (err: any) {
        setError(err?.code === 'permission-denied' 
          ? 'Unable to access graduate data' 
          : 'Failed to load graduates');
      } finally {
        setLoading(false);
      }
    };

    fetchGraduates();
  }, []);

  const navigate = (path: string) => window.location.href = path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/src/showcaseHero.jpg')` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl text-white md:text-6xl font-bold mb-4">
            Graduate Showcase
          </h1>
          <p className="text-lg text-white sm:text-xl mb-8">
            Build Carolina envisions a thriving, accessible tech talent ecosystem in South Carolina. The Graduate Showcase portal offers a bridge between employers and graduates, to connect and find opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn && (
              <button
                onClick={() => navigate('/create-profile')}
                className="border-2 border-hotPink text-hotPink hover:bg-hotPinkHover hover:text-white hover:border-hotPinkHover px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Manage Profile
              </button>
            )}
            <button
              onClick={() => navigate('/graduates')}
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
            {[
              { icon: Code, title: "Showcase Your Skills", text: "You're more than a GPA. Build a compelling profile with projects, portfolios, and certifications to show employers what makes you stand out." },
              { icon: Search, title: "Get Discovered", text: "Put your name out there. Join our talent directory to gain visibility with local companies looking to hire local graduates with your unique talents." },
              { icon: Building, title: "Connect with Local Talent", text: "Find your perfect fit. Search our directory to find fresh talent based on your company's location, job needs, skill requirements, and culture fit." }
            ].map((feature, i) => (
              <div key={i} className="border-2 border-gray-100 bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#E93679' }}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-darkBlue-600 mb-4">
                  <b>{feature.text.split('.')[0]}.</b> {feature.text.split('.').slice(1).join('.')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Graduates Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Graduates</h2>
            <button onClick={() => navigate('/graduates')} className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
              <button onClick={() => window.location.reload()} className="text-red-700 hover:text-red-500 text-sm font-medium ml-4">
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white shadow-md rounded-lg animate-pulse p-6">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="flex gap-2 justify-center">
                    <div className="h-6 bg-gray-300 rounded-full w-12"></div>
                    <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredGraduates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGraduates.map((graduate, index) => (
                <div key={graduate.id} className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg hover:-translate-y-1">
                  <div className="p-6 text-center">
                    {graduate.profileImage ? (
                      <img src={graduate.profileImage} alt={graduate.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
                    ) : (
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>
                        {getInitials(graduate.name)}
                      </div>
                    )}
                    <h3 className="font-bold text-gray-900 mb-1">{graduate.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{graduate.role}</p>
                    {graduate.location && (
                      <p className="text-xs text-gray-400 mb-4 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" />{graduate.location}
                      </p>
                    )}
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                      {graduate.skillTags.map((skill, skillIndex) => {
                        const colors = SKILL_COLORS[skillIndex % SKILL_COLORS.length];
                        return (
                          <span key={skillIndex} className={`${colors.bg} ${colors.text} px-2 py-1 rounded-full text-xs font-medium`}>
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Verified Graduates Yet</h3>
              <p className="text-gray-500">Be the first to create and verify your profile!</p>
              {isLoggedIn && (
                <button onClick={() => navigate('/create-profile')} className="mt-4 bg-hotPink hover:bg-hotPinkHover text-white px-6 py-2 rounded-full font-medium transition-colors">
                  Create Profile
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-lightBlue py-12 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-darkBlue text-sm">© 2025 Build Carolina Graduate Showcase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;