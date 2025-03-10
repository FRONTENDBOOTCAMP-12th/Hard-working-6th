import { useEffect } from 'react';
import supabaseClient from './utils/SupabaseClient';
import ProfileCard from './components/Organism/ProfileCard';

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

  return (
    <ProfileCard></ProfileCard>
  )
}

export default App;
