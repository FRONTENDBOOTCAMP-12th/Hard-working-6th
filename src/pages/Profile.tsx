import ProfileCard from '@/components/Organism/ProfileCard';
// import ProfileNavigation from '@/components/Organism/ProfileNavigation';

const Profile = () => {
  return (
    <div className="min-h-screen p-6 text-white relative bg-[var(--color-primary-gradient1)]">
      <ProfileCard />
      {/* <ProfileNavigation /> */}
    </div>
  );
};

export default Profile;
