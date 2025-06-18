import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff,
  Search,
  Filter,
  Calendar,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Globe,
  Trash2,
  AlertTriangle,
  User,
  Code
} from 'lucide-react';

interface GraduateProfile {
  id: string;
  name: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  profileImage: string;
  role: string;
  graduationCohort: string;
  skillTags: string[];
  status: 'pending' | 'approved' | 'rejected';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const Management: React.FC = () => {
  const [profiles, setProfiles] = useState<GraduateProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<GraduateProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<GraduateProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [cohortFilter, setCohortFilter] = useState<string>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [profiles, searchTerm, statusFilter, cohortFilter]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const profilesRef = collection(db, 'graduates');
      const q = query(profilesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const profilesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GraduateProfile[];

      setProfiles(profilesData);
      
      // Calculate stats
      const newStats = {
        total: profilesData.length,
        pending: profilesData.filter(p => p.status === 'pending').length,
        approved: profilesData.filter(p => p.status === 'approved').length,
        rejected: profilesData.filter(p => p.status === 'rejected').length
      };
      setStats(newStats);
      
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setMessage('Error fetching profiles');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = profiles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skillTags.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(profile => profile.status === statusFilter);
    }

    // Cohort filter
    if (cohortFilter !== 'all') {
      filtered = filtered.filter(profile => profile.graduationCohort === cohortFilter);
    }

    setFilteredProfiles(filtered);
  };

  const handleApprove = async (profileId: string) => {
    try {
      setActionLoading(profileId);
      const profileRef = doc(db, 'graduates', profileId);
      await updateDoc(profileRef, {
        status: 'approved',
        isVerified: true,
        updatedAt: new Date().toISOString()
      });
      
      setProfiles(prev => prev.map(p => 
        p.id === profileId 
          ? { ...p, status: 'approved' as const, isVerified: true, updatedAt: new Date().toISOString() }
          : p
      ));
      
      setMessage('Profile approved successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error approving profile:', error);
      setMessage('Error approving profile');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (profileId: string) => {
    try {
      setActionLoading(profileId);
      const profileRef = doc(db, 'graduates', profileId);
      await updateDoc(profileRef, {
        status: 'rejected',
        updatedAt: new Date().toISOString()
      });
      
      setProfiles(prev => prev.map(p => 
        p.id === profileId 
          ? { ...p, status: 'rejected' as const, updatedAt: new Date().toISOString() }
          : p
      ));
      
      setMessage('Profile rejected');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error rejecting profile:', error);
      setMessage('Error rejecting profile');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (profileId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this profile? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(profileId);
      await deleteDoc(doc(db, 'graduates', profileId));
      
      setProfiles(prev => prev.filter(p => p.id !== profileId));
      setMessage('Profile deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setMessage('Error deleting profile');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  const uniqueCohorts = [...new Set(profiles.map(p => p.graduationCohort))].sort().reverse();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage graduate profile submissions and approvals</p>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-pink-600" size={24} />
              <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
              <span className="text-gray-500">Total Profiles</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="text-red-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Profiles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Cohorts</option>
              {uniqueCohorts.map(cohort => (
                <option key={cohort} value={cohort}>Class of {cohort}</option>
              ))}
            </select>

            <button
              onClick={fetchProfiles}
              disabled={loading}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">{message}</p>
          </div>
        )}

        {/* Profiles Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Graduate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Cohort
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Loading profiles...
                    </td>
                  </tr>
                ) : filteredProfiles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No profiles found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProfiles.map((profile) => (
                    <tr key={profile.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {profile.profileImage ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={profile.profileImage}
                                alt=""
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling!.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center ${profile.profileImage ? 'hidden' : ''}`}>
                              <User className="text-pink-600" size={20} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail size={12} className="mr-1" />
                              {profile.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{profile.role}</div>
                        <div className="text-sm text-gray-500">Class of {profile.graduationCohort}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin size={12} className="mr-1" />
                          {profile.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(profile.status)}`}>
                          {getStatusIcon(profile.status)}
                          <span className="ml-1 capitalize">{profile.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProfile(profile);
                              setShowProfileModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Profile"
                          >
                            <Eye size={16} />
                          </button>
                          
                          {profile.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(profile.id)}
                                disabled={actionLoading === profile.id}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                title="Approve"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleReject(profile.id)}
                                disabled={actionLoading === profile.id}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                          
                          <button
                            onClick={() => handleDelete(profile.id)}
                            disabled={actionLoading === profile.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-16 w-16">
                      {selectedProfile.profileImage ? (
                        <img
                          className="h-16 w-16 rounded-full object-cover"
                          src={selectedProfile.profileImage}
                          alt=""
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
                          <User className="text-pink-600" size={24} />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">{selectedProfile.name}</h3>
                      <p className="text-gray-600">{selectedProfile.role}</p>
                      <p className="text-sm text-gray-500">Class of {selectedProfile.graduationCohort}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Bio</h4>
                    <p className="text-gray-700">{selectedProfile.bio}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.skillTags.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact & Actions */}
                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={16} className="mr-2" />
                        <a href={`mailto:${selectedProfile.email}`} className="hover:text-pink-600">
                          {selectedProfile.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        {selectedProfile.location}
                      </div>
                      {selectedProfile.linkedin && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Linkedin size={16} className="mr-2" />
                          <a href={selectedProfile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                            LinkedIn
                          </a>
                        </div>
                      )}
                      {selectedProfile.github && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Github size={16} className="mr-2" />
                          <a href={selectedProfile.github} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                            GitHub
                          </a>
                        </div>
                      )}
                      {selectedProfile.website && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe size={16} className="mr-2" />
                          <a href={selectedProfile.website} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Status</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedProfile.status)}`}>
                      {getStatusIcon(selectedProfile.status)}
                      <span className="ml-1 capitalize">{selectedProfile.status}</span>
                    </span>
                    <p className="text-xs text-gray-500 mt-2">
                      Submitted: {new Date(selectedProfile.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Updated: {new Date(selectedProfile.updatedAt).toLocaleString()}
                    </p>
                  </div>

                  {selectedProfile.status === 'pending' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleApprove(selectedProfile.id);
                          setShowProfileModal(false);
                        }}
                        disabled={actionLoading === selectedProfile.id}
                        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
                      >
                        Approve Profile
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedProfile.id);
                          setShowProfileModal(false);
                        }}
                        disabled={actionLoading === selectedProfile.id}
                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50"
                      >
                        Reject Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;