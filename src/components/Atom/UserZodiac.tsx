import { tm } from '@/utils/tw-marge';
import supabaseClient from '@/utils/SupabaseClient';
import Aries from '@/assets/zodiac/aries.svg';

interface UserZodiacProps {
  className?: string;
}

function UserZodiac({ className }: UserZodiacProps) {
  return (
    <section className={tm('opacity-40', className)}>
      <h2 className="sr-only">나의 별자리</h2>
      <img src={Aries} alt="별자리 이미지" />
    </section>
  );
}

export default UserZodiac;
