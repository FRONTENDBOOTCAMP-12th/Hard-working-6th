import { BrowserRouter, Route, Routes } from 'react-router';
import TairoPage from './pages/TairoPage';
import TairoTheme from './pages/TairoTheme';
import TairoHistory from './pages/TairoHistory';
import PageLayout from './layout/PageLayout';

import CardSwiper from './components/Molecule/CardSwiper';
import TodayFortune from './components/Atom/TodayFortune';
import TairoResult from './components/Organism/TairoResult';
import ProfileCard from './components/Organism/ProfileCard';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePageg';
// import Test from './components/Molecule/Test';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

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
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />

        <Route element={<PageLayout />}>
          <Route path="/tairo-theme">
            <Route index element={<TairoTheme />} />
            <Route path="tairo" element={<TairoPage />} />
            <Route path="result" element={<TairoResult />} />
          </Route>

          <Route path="/tairo-history" element={<TairoHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
