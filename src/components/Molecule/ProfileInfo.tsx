import TextLabel from "../Atom/TextLabel";

interface ProfileInfoProps {
  name: string;
  birth: string;
  email: string;
  joined: string;
}

const ProfileInfo = ({ name, birth, email, joined }: ProfileInfoProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-[var(--color-font)]">{name}</h2>

      <TextLabel text={birth} className="mt-1 text-[var(--color-gray)]" />

      <div className="mt-4 w-72 border-b pb-1 text-[var(--color-font)] border-[var(--color-light-gray)]">
        {email}
      </div>

      <div className="mt-2 w-72 border-b pb-1 text-[var(--color-font)] border-[var(--color-light-gray)]">
        {joined}
      </div>
    </div>
  );
};

export default ProfileInfo;
