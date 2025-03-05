// import { useEffect } from 'react';
// import supabaseClient from './utils/SupabaseClient';
import ChipList from './components/Molecule/ChipList';

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
      <h1>Chip Component Test</h1>
      <ChipList />
    </div>
  );
}

export default App;
