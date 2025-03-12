import supabaseClient from '@/utils/SupabaseClient';
import { useEffect } from 'react';

function Test() {
  useEffect(() => {
    const signInWithOAuth = async () => {
      const { error, data } = await supabaseClient.auth.signInWithOAuth({
        provider: 'github',
      });

      console.log(data, error);
    };
    signInWithOAuth();
  }, []);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export default Test;
