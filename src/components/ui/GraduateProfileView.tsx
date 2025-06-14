import React, { useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Mail,
  User,
  Code,
  Clock,
} from "lucide-react";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ProfileModal = ({ graduateData, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
            <img
              src={graduateData.profileImage}
              alt={graduateData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{graduateData.name}</h1>
            <p className="text-xl opacity-90 mb-2">{graduateData.role}</p>
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <MapPin size={16} />
              <span>{graduateData.location}</span>
              <span className="mx-2">•</span>
              <Calendar size={16} />
              <span>Class of {graduateData.graduationCohort}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Bio Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 text-blue-600" size={20} />
            About
          </h2>
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
            {graduateData.bio}
          </p>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Code className="mr-2 text-blue-600" size={20} />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {graduateData.skillTags.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact & Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactItem
              Icon={Mail}
              label="Email"
              value={graduateData.email}
              href={`mailto:${graduateData.email}`}
              colorClass="text-red-500"
            />
            <ContactItem
              Icon={Github}
              label="GitHub"
              value="View Profile"
              href={graduateData.github}
              colorClass="text-gray-800"
            />
            <ContactItem
              Icon={Linkedin}
              label="LinkedIn"
              value="View Profile"
              href={graduateData.linkedin}
              colorClass="text-blue-700"
            />
            <ContactItem
              Icon={Globe}
              label="Website"
              value="Visit Website"
              href={graduateData.website}
              colorClass="text-green-600"
            />
          </div>
        </section>

        {/* Profile Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-2 text-blue-600" size={20} />
            Profile Information
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <ProfileInfo label="Profile Created:" value={formatDate(graduateData.createdAt)} />
            <ProfileInfo label="Last Updated:" value={formatDate(graduateData.updatedAt)} />
            <ProfileInfo label="Verified:" value={graduateData.verifiedAt} valueClass="text-green-600" />
            <ProfileInfo label="Graduation Cohort:" value={graduateData.graduationCohort} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Close Profile
        </button>
      </div>
    </div>
  </div>
);

// Helper components for repeated patterns
const ContactItem = ({ Icon, label, value, href, colorClass }) => (
  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
    <Icon className={colorClass} size={20} />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        {value}
      </a>
    </div>
  </div>
);

const ProfileInfo = ({ label, value, valueClass }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className={`font-medium ${valueClass || ""}`}>{value}</span>
  </div>
);

const GraduateProfileView = ({ graduateData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Graduate Card */}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white">
              <img
                src={graduateData.profileImage}
                alt={graduateData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{graduateData.name}</h3>
              <p className="opacity-90">{graduateData.location}</p>
              <p className="opacity-80 text-sm">{graduateData.role}</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <Github size={16} />
            <Linkedin size={16} />
            <Mail size={16} />
            <Globe size={16} />
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ProfileModal graduateData={graduateData} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default GraduateProfileView;
