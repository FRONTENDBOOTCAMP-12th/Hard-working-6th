import { useEffect } from 'react';
import supabaseClient from './utils/SupabaseClient';
import TodayFortune from './components/Atom/TodayFortune';
import CommonNav from './components/Atom/CommonNav';

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
    <>
      <CommonNav></CommonNav>
      <TodayFortune></TodayFortune>
    </>
  );
}

export default App;
