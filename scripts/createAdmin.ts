// scripts/createAdmin.ts
import { adminHelpers } from '../src/firebase/firebase-admin'; // adjust path as needed

async function run() {
  try {
    const user = await adminHelpers.createAdminUser(
      'buildcarolina283@admin.com',    // <-- Replace with your admin email
      'hif937f2',   // <-- Use a strong password
    );
    console.log('Admin user created:', user.uid);
  } catch (err) {
    console.error('Failed to create admin user:', err);
  }
}

run();
