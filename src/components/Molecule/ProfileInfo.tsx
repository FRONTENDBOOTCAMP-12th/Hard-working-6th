import TextLabel from '@/components/Atom/TextLabel';

interface ProfileInfoProps {
  name: string;
  gender: string;
  birthdate: string;
  zodiac: string;
  email: string;
}

const ProfileInfo = ({ name, gender, birthdate, zodiac, email }: ProfileInfoProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold">{name}</h2>
      <TextLabel text={`${gender} ${zodiac}`} className="mt-1 text-[var(--color-gray)]" />
      <TextLabel text={birthdate} className="mt-1 text-[var(--color-gray)]" />
      <div className="mt-4 w-72 border-b pb-1] border-[var(--color-light-gray)]">
        {email}
      </div>
    </div>
  );
};

export default ProfileInfo;
