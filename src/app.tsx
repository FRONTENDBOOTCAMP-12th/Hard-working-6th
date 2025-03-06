// import { useEffect } from 'react';
// import supabaseClient from './utils/SupabaseClient';
// import ChipList from './components/Molecule/ChipList';
import HistoryCalendar from './components/Atom/Calendar';

function App() {
  // useEffect(() => {
  //   // async function signUp() {
  //   //   const { data, error } = await supabaseClient.auth.signUp({
  //   //     email: 'audwognl@gmail.com',
  //   //     password: 'password',
  //   //   });
  //   //   console.log(data, error);
  //   // }
  //   // signUp();
  // });

  return (
    <div className="flex flex-col bg-primary-gradient1">
      <h1>Calendar Test</h1>
      <HistoryCalendar />
    </div>
  );
}

export default App;
