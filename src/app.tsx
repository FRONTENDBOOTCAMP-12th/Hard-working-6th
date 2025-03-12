import { useEffect } from 'react';
import supabaseClient from './utils/SupabaseClient';
import { BrowserRouter, Route, Routes } from 'react-router';
import TairoPage from './pages/TairoPage';
import TairoTheme from './pages/TairoTheme';
import TairoHistory from './pages/TairoHistory';
import PageLayout from './layout/PageLayout';
import TairoResult from './components/Organism/TairoResult';
import ProfileCard from './components/Organism/ProfileCard';

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
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/tairo" element={<TairoPage />} />
          <Route path="/tairo-theme" element={<TairoTheme />} />
          <Route path="/tairo-result" element={<TairoResult />} />
          <Route path="/profile-card" element={<ProfileCard />} />
          <Route path="/tairo-history" element={<TairoHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
