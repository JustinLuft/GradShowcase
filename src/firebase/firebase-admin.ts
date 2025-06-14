// firebase-admin.ts
// This file is for SERVER-SIDE operations only (Node.js, API routes, etc.)

import admin from 'firebase-admin';

// Your service account JSON hardcoded here:
const serviceAccount = {
  "type": "service_account",
  "project_id": "careershare-fc3b6",
  "private_key_id": "4217d4f2dc3fbbe65e48f1954e338260d5acfeb3",
  "private_key": `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1IvFWjj1nhNwX
ug9AP8n994OTDjY4SPDuVLDeQQ+JSiSDuuuZWJWwTJS3hPUZFKJTbkB/MRQ9SZKS
vAF3NjzdGl82LrO3hwPuvdjxZBK0vqg2bAWjwIQ5VIqLHLnNNo/xOrQTHh22UvIk
DMEGVzHra+JXZRyLdXOnrEpEbha8jVFBMr2DJ5udkKdCDJjyjbT3WueZXfaHWkqz
U880iV+Bd5yoXcLeB+JDBjtW2jWnUOpWYa2SbrS+qkaBSdCZAIQvdfOrYZwx2j//
M/4Jzh8LujfdgHSI+m1TKGpYxDGh4bwRk3onjysJCFjoSN7uOc47tHJG3+fMOda6
TcCP8tkZAgMBAAECggEAEIZAPQfoR/LU/0cgHNmuf2aenRvdTDPMFi0phRHek6ts
+r8V8inXxTsSdoGAuJaEzn0O3jhnr8WjKca3KlBxq5WinPdHhuHtNNDviYOT7Bak
+T4DVhjgfYU3lF3jZ2C0YsRBT3ZeYIn4zagdZ3FgVcLd5a1Zz5eNHJbfn/y13BWv
Zwa5Mtv9NqxjeWHeH50bKj/R34z3D34GAxfEGjX0gg4PoBUZM7Rqlvgg7gR8BFE0
M6HgFKq7fN+4Oyyrlt9XaTH65vy1AC62cBgcw8KucHZix/cvwuAYgxFF9ZIDX+gs
CXPweuqE+rV5rvhjWz6qIrOnw662Wxc9isMdvIR6hwKBgQD39rY9jKKG6YNElnXD
ac/WdpvoKklrhZRuMj0LKqMGzlIvVYbs75qgLd8DU8GYhnGON/9ztGe1Z2zBCCSo
tLDTmKq5sXXOLJpYSTCwdwO6I/X85w5ue39KS+Jnp5lKbx5uMYMHomaIQpNuF/Nc
yzLkNAVGdmu8v/PjyO0GTj2ZBwKBgQC7AciMjWnS276/NPrMYEOQFAEicZeRUfos
OBWC6q/SBHtJs2ycnThrjZnxYo9NJ+k3RHNSruVxPyrW4V2ga5h3EswPwRDqjilp
XrL+e/QUAZJ/tLLfEnm6h/Cf6Wtu5xQzG7UXoGd+bNxOuq6Mc0+llfeBlS5Oz1na
nywMPXoU3wKBgQDapwSgVajjinokOwDxJhcNqF1mZhOD6rCuU0Kc3CYR1FGIR8TI
nagd4xUqW+r00mjD3gE2SDjDL8YomUOqOFtM2uyA/klBWvdnLnLuyKPSue8p6Z1C
M0hVfYDRomp7xmxxAtvmGYCMWxiiFiCVDOF9dZnJPpdWQ3WOwRixXMDYdQKBgQCG
mbMCz2pC1d3GfFikMAmRM4TZiM8iTtH1b+yzzT39uTIQCy/6zgLlDwelwV4Jl9d5
6y/ibHZC+8dW4OFl7OvRkNsF393QJcDS0dGd8BPvLm6GssYoX4D0bJIaV4T3TyWv
35qJxe+YBLzRgfbOqtTCB14djAXHveEbxYOLz9gGGwKBgE1bNsWUYo6ioyz1iL/T
2grUvc6lnElkqvkeCcO6PoJgOqxEPhdU26C65MOfCMG0cEEKtFplID1FawVpqiz8
v0fI6FCLyhyjwn7ycrEtoCdTap647OYhPXpjHFmNBhKFnI9YfJWe4ITedRMzsyGD
fhkEW82kN7dNy3uzaK/Ruvsz
-----END PRIVATE KEY-----\n`,
  "client_email": "firebase-adminsdk-fbsvc@careershare-fc3b6.iam.gserviceaccount.com",
  "client_id": "103488922815285494212",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40careershare-fc3b6.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://careershare-fc3b6-default-rtdb.firebaseio.com"
  });
}

// Export admin services
export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminRealtime = admin.database();

// Helper functions for common admin operations
export const adminHelpers = {
  // Create admin user
  async createAdminUser(email: string, password: string, displayName?: string) {
    try {
      const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName,
        emailVerified: true
      });
      
      // Set admin claims
      await adminAuth.setCustomUserClaims(userRecord.uid, { admin: true });
      
      // Create user document
      await adminDb.collection('users').doc(userRecord.uid).set({
        email,
        displayName: displayName || 'Admin User',
        role: 'admin',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isAdmin: true
      });
      
      return userRecord;
    } catch (error) {
      console.error('Error creating admin user:', error);
      throw error;
    }
  },

  // Set admin claims for existing user
  async makeUserAdmin(uid: string) {
    try {
      await adminAuth.setCustomUserClaims(uid, { admin: true });
      
      // Update user document
      await adminDb.collection('users').doc(uid).update({
        role: 'admin',
        isAdmin: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error setting admin claims:', error);
      throw error;
    }
  },

  // Verify admin token
  async verifyAdminToken(idToken: string) {
    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      return decodedToken.admin === true;
    } catch (error) {
      console.error('Error verifying admin token:', error);
      return false;
    }
  },

  // Get user by email
  async getUserByEmail(email: string) {
    try {
      return await adminAuth.getUserByEmail(email);
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  // Update graduate verification status
  async updateGraduateVerification(graduateId: string, isVerified: boolean) {
    try {
      await adminDb.collection('graduates').doc(graduateId).update({
        isVerified,
        verifiedAt: isVerified ? admin.firestore.FieldValue.serverTimestamp() : null
      });
      return true;
    } catch (error) {
      console.error('Error updating graduate verification:', error);
      throw error;
    }
  }
};

export default admin;
