import { useEffect } from 'react';
import supabaseClient from './utils/SupabaseClient';

function App() {
  useEffect(() => {
    async function Insert() {
      const { error } = await supabaseClient
        .from('countries')
        .insert({ id: 1, name: 'Mordor' });
    }
    async function signUp() {
      const { data, error } = await supabaseClient.auth.signUp({
        email: 'audwognl@gmail.com',
        password: 'password',
      });
      console.log(data, error);
    }

    signUp();
    console.log();
  });

  return <div className="bg-red-200">box</div>;
}

export default App;
