import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { Link } from 'react-router-dom';

interface GraduateProfileCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  title: string;
  location: string;
  techStack: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  email: string;
}

const GraduateProfileCard: React.FC<GraduateProfileCardProps> = ({
  id,
  name,
  imageUrl,
  title,
  location,
  techStack,
  githubUrl,
  linkedinUrl,
  websiteUrl,
  email,
}) => {
  return (
    <Card className="w-full max-w-sm bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center space-y-3 pt-6">
        <Avatar className="w-24 h-24">
          <AvatarImage 
            src={imageUrl || "https://images.unsplash.com/photo-1507679799987-c73779587ccf"} 
            alt={name} 
          />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <Link to={`/graduates/${id}`} className="hover:text-secondary">
            <h3 className="text-xl font-heading font-semibold">{name}</h3>
          </Link>
          <p className="text-sm text-foreground/70">{title}</p>
          <p className="text-sm text-foreground/60">{location}</p>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <Badge key={index} variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex justify-center space-x-3">
          {githubUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          )}
          {linkedinUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          )}
          {websiteUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5" />
              </a>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <a href={`mailto:${email}`}>
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="mt-4">
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-white"
            asChild
          >
            <Link to={`/graduates/${id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraduateProfileCard;
