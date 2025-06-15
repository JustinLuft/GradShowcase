import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

import { auth } from '../firebase/firebase'; // Adjust path as needed
import { onAuthStateChanged, signOut, User, getIdTokenResult } from 'firebase/auth';

const Layout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        try {
          const idTokenResult = await getIdTokenResult(firebaseUser, true);
          setIsAdmin(!!idTokenResult.claims.admin);
        } catch (error) {
          console.error('Failed to get token claims:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserName = () => {
    if (!user || !user.displayName) return '';
    const names = user.displayName.split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';
    return `${firstName} ${lastName}`;
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BC</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Build Carolina Graduate Showcase</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              <Link to="/graduates" className="text-gray-700 hover:text-blue-600 font-medium">
                Graduates
              </Link>
              <Link to="/projects" className="text-gray-700 hover:text-blue-600 font-medium">
                Projects
              </Link>
              <Link to="/success" className="text-gray-700 hover:text-blue-600 font-medium">
                Success Stories
              </Link>

              
            </nav>

            {/* Right side buttons - Authentication */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="text-sm text-gray-600">
                  Loading...
                </div>
              ) : !user ? (
                <>
                  <Link to="/signin">
                    <Button className="bg-pink-600 text-white hover:bg-pink-700">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-pink-600 text-white hover:bg-pink-700">
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                {/* Show management button if admin */}
                {isAdmin && (
                <Link to="/manage">
                  <Button className="bg-green-600 text-white hover:bg-green-700">
                    Management
                  </Button>
                </Link>
                )}

                  <span className="text-sm font-medium text-gray-900">
                    {getUserName()}
                  </span>
                  <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    Logout
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link to="/graduates" className="text-gray-700 hover:text-blue-600 font-medium">
                    Graduates
                  </Link>
                  <Link to="/projects" className="text-gray-700 hover:text-blue-600 font-medium">
                    Projects
                  </Link>
                  <Link to="/success" className="text-gray-700 hover:text-blue-600 font-medium">
                    Success Stories
                  </Link>

                  {/* Mobile management button if admin */}
                  {isAdmin && (
                    <Link to="/management">
                      <Button className="bg-green-600 text-white hover:bg-green-700">
                        Management
                      </Button>
                    </Link>
                  )}

                  <Separator className="my-4" />
                  {/* Mobile Authentication */}
                  {loading ? (
                    <div className="text-sm text-gray-600">
                      Loading...
                    </div>
                  ) : !user ? (
                    <>
                      <Link to="/signin">
                        <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">
                          Register
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="text-sm font-medium text-gray-900 px-2">
                        Welcome, {getUserName()}
                      </div>
                      <Button variant="outline" onClick={handleLogout} className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                        Logout
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
