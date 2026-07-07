import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const adminApp = getApps().length === 0 ? initializeApp() : getApp();
export const adminAuth = getAuth(adminApp);

