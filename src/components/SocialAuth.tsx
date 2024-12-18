import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface SocialAuthProps {
  mode: 'login' | 'register';
}

const SocialAuth: React.FC<SocialAuthProps> = ({ mode }) => {
  const { signInWithGoogle, signInWithGithub, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      toast.success(`${mode === 'login' ? 'Signed in' : 'Signed up'} successfully!`);
      navigate('/dashboard');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSocialAuth('google')}
          disabled={loading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with Google</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
        </button>

        <button
          onClick={() => handleSocialAuth('github')}
          disabled={loading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Sign in with GitHub</span>
          <Github className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;