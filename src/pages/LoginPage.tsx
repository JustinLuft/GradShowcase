import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // Placeholder auth functions - to be implemented with Firebase
  const handleGoogleLogin = () => {
    // Implement Google login
  };

  const handleGithubLogin = () => {
    // Implement GitHub login
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <LogIn className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-heading font-bold text-primary">Welcome Back</h1>
          <p className="mt-2 text-lg text-foreground/80">Sign in to Carolina Graduate Showcase</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full h-12 text-base"
              onClick={handleGoogleLogin}
            >
              <img 
                src="/google.svg" 
                alt="Google" 
                className="w-5 h-5 mr-2" 
              />
              Continue with Google
            </Button>

            <div className="flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <Button 
              variant="outline" 
              className="w-full h-12 text-base"
              onClick={handleGithubLogin}
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
          </CardFooter>
        </Card>

        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf" 
            alt="Graduates" 
            className="absolute -z-10 opacity-10 rounded-3xl w-full h-96 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
