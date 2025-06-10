import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

import { auth } from '../firebase/firebase'; // Adjust path as needed
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

const Layout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged listener will update user state
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
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <a className="flex items-center space-x-2 font-heading" href="/">
                  <span className="font-bold">Carolina Graduate Showcase</span>
                </a>
                <Separator />
                <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
                  <div className="flex flex-col space-y-2">
                    <a
                      href="/graduates"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      Graduates
                    </a>
                    <a
                      href="/projects"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      Projects
                    </a>
                    <a
                      href="/employers"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      Employers
                    </a>
                    <a
                      href="/about"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      About
                    </a>
                  </div>
                </ScrollArea>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center justify-between">
            <div className="hidden md:flex">
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a href="/" className="font-heading font-bold">
                  Carolina Graduate Showcase
                </a>
                <a
                  href="/graduates"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Graduates
                </a>
                <a
                  href="/projects"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Projects
                </a>
                <a
                  href="/employers"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Employers
                </a>
                <a
                  href="/about"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  About
                </a>
              </nav>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center justify-end space-x-4">
              {loading ? (
                <div className="hidden md:inline-flex text-sm text-foreground/60">
                  Loading...
                </div>
              ) : !user ? (
                <>
                  <Link to="/signin" className="hidden md:inline-flex">
                    <Button className="bg-blue-900 text-white hover:bg-blue-800">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="hidden md:inline-flex">
                    <Button className="bg-blue-900 text-white hover:bg-blue-800">
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="hidden md:inline-flex text-sm font-medium">
                    {getUserName()}
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background">
        <div className="container py-6 md:py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-heading text-lg font-semibold">About</h3>
              <p className="mt-4 text-sm text-foreground/60">
                Showcasing talented graduates from Carolina's top programs.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="/graduates"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Browse Graduates
                  </a>
                </li>
                <li>
                  <a
                    href="/projects"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    View Projects
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="/employers"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    For Employers
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    About Platform
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="text-foreground/60">Email: contact@example.com</li>
                <li className="text-foreground/60">Phone: (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} Carolina Graduate Showcase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
