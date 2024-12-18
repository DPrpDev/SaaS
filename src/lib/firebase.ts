import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDA2AqSUrTG6fWOvhq5tTj3csohfQo3y5M",
  authDomain: "saas-8e5e3.firebaseapp.com",
  projectId: "saas-8e5e3",
  storageBucket: "saas-8e5e3.firebasestorage.app",
  messagingSenderId: "505477016343",
  appId: "1:505477016343:web:c050f5f58d5010cd84e552",
  measurementId: "G-JLG69S8KBP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();