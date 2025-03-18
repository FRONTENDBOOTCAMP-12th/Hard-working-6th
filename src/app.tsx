import { BrowserRouter, Route, Routes } from 'react-router';
import TairoPage from './pages/TairoPage';
import TairoTheme from './pages/TairoTheme';
import TairoHistory from './pages/TairoHistory';
import PageLayout from './layout/PageLayout';
import TairoResult from './components/Organism/TairoResult';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
// import Test from './components/Molecule/Test';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

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

        {/* 보호된 페이지 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PageLayout />}>
            <Route path="/tairo-theme">
              <Route index element={<TairoTheme />} />
              <Route path="tairo" element={<TairoPage />} />
              <Route path="result" element={<TairoResult />} />
            </Route>

            <Route path="/tairo-history" element={<TairoHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
