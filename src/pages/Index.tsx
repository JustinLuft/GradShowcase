import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Code, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const IndexPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-6xl mx-auto text-center">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
            Carolina Graduate Showcase
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connecting talented graduates with opportunities in tech. Showcase your projects,
            build your profile, and find your next career move.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/create-profile">Create Your Profile</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/graduates">Browse Graduates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of the page remains the same... */}
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <Code className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Showcase Projects</h3>
                <p className="text-muted-foreground">
                  Display your best work and technical skills through detailed project portfolios.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Connect with Peers</h3>
                <p className="text-muted-foreground">
                  Build your professional network and collaborate with fellow graduates.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <Briefcase className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Find Opportunities</h3>
                <p className="text-muted-foreground">
                  Get discovered by employers looking for fresh talent and exciting opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Graduates Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-heading font-bold">Featured Graduates</h2>
            <Button variant="outline" asChild>
              <Link to="/graduates" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
            <div className="flex space-x-4 p-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="inline-block w-[300px] shrink-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10" />
                      <div>
                        <h3 className="font-heading font-semibold">Graduate Name</h3>
                        <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Showcase Your Talents?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join our community of talented graduates and take the next step in your career journey.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/create-profile">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
