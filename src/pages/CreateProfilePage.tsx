import React from 'react';
import GraduateProfileForm from '@/components/GraduateProfileForm';

const CreateProfilePage = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">
          Create Your Graduate Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Showcase your skills, projects, and professional journey
        </p>
      </div>
      <GraduateProfileForm />
    </div>
  );
};

export default CreateProfilePage;
