import { useEffect } from 'react';
import supabaseClient from './utils/SupabaseClient';

function App() {
  useEffect(() => {
    // async function signUp() {
    //   const { data, error } = await supabaseClient.auth.signUp({
    //     email: 'audwognl@gmail.com',
    //     password: 'password',
    //   });
    //   console.log(data, error);
    // }
    // signUp();
  });

  return <div className="bg-red-200">box</div>;
}

export default App;
