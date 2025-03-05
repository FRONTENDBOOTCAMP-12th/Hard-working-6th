import { useEffect } from 'react';
import supabaseClient from './utils/SupabaseClient';
import { BrowserRouter, Route, Routes } from 'react-router';
import TairoPage from './pages/TairoPage';

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
    <BrowserRouter>
      <Routes>
        <Route path="/tairo" element={<TairoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
