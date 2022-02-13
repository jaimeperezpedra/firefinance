import { initializeApp } from 'firebase-admin/app'
import { config } from './config.js';

export const db = initializeApp(config.firebaseConfig);
