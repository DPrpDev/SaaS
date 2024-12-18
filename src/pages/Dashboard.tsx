import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const Dashboard = () => {
  const { user, signOut } = useAuthStore();
  const { currentTheme } = useThemeStore();

  return (
    <div className={`min-h-screen ${currentTheme.colors.background} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
      <div className={`${currentTheme.colors.surface} shadow rounded-lg p-6`} style={{ boxShadow: `0 40px 6px rgba(${currentTheme.colors.shadow})` }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${currentTheme.colors.text}`}>
              Welcome, {user?.displayName}
            </h1>
            <button
              onClick={signOut}
              className={`px-4 py-2 rounded-md text-sm font-medium ${currentTheme.colors.primary}`}
            >
              Sign Out
            </button>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h2 className={`text-lg font-medium ${currentTheme.colors.text}`}>
              Your Dashboard
            </h2>
            <p className={`mt-2 ${currentTheme.colors.text}`}>
              This is your dashboard. Start building your SaaS features here!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;