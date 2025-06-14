import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Adjust path to your Firebase client config
import { Button } from '@/components/ui/button';

interface Graduate {
  id: string;
  email?: string;
  displayName?: string;
  isVerified: boolean;
}

const Management = () => {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUnverifiedGraduates = async () => {
    setLoading(true);
    try {
      const graduatesRef = collection(db, 'graduates');
      const q = query(graduatesRef, where('isVerified', '==', false));
      const snapshot = await getDocs(q);

      const grads: Graduate[] = [];
      snapshot.forEach((doc) => {
        grads.push({
          id: doc.id,
          ...doc.data()
        } as Graduate);
      });

      setGraduates(grads);
    } catch (error) {
      console.error('Error fetching graduates:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyGraduate = async (id: string) => {
    setUpdatingId(id);
    try {
      const gradDoc = doc(db, 'graduates', id);
      await updateDoc(gradDoc, {
        isVerified: true,
        verifiedAt: serverTimestamp()
      });
      fetchUnverifiedGraduates();
    } catch (error) {
      console.error('Error verifying graduate:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchUnverifiedGraduates();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Management Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">Unverified Graduates</h2>

      {loading ? (
        <p>Loading graduates...</p>
      ) : graduates.length === 0 ? (
        <p>All graduates are verified!</p>
      ) : (
        <ul className="space-y-4">
          {graduates.map((grad) => (
            <li
              key={grad.id}
              className="flex justify-between items-center border p-4 rounded shadow-sm"
            >
              <div>
                <p className="font-medium">{grad.displayName || grad.email || 'No Name'}</p>
                <p className="text-sm text-gray-600">{grad.email || 'No Email'}</p>
              </div>
              <Button
                onClick={() => verifyGraduate(grad.id)}
                disabled={updatingId === grad.id}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                {updatingId === grad.id ? 'Verifying...' : 'Verify'}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Management;
