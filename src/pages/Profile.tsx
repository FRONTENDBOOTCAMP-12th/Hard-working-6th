import { useNavigate } from 'react-router';
import { Settings } from 'lucide-react';
import ProfileCard from '@/components/Organism/ProfileCard';
// import ProfileNavigation from '@/components/Organism/ProfileNavigation';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 text-white relative">
      <div className="flex justify-start mb-4">
        <button onClick={() => navigate('/settings')}>
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      <ProfileCard />
      {/* <ProfileNavigation /> */}
    </div>
  );
};

export default Profile;
