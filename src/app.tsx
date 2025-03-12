import { BrowserRouter, Routes, Route } from "react-router";
import ProfileCard from "./components/Organism/ProfileCard";
import TairoPage from "./pages/TairoPage";
import TairoTheme from "./pages/TairoTheme";
import PageLayout from "./layout/PageLayout";
import TairoResult from "./components/Organism/TairoResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/tairo" element={<TairoPage />} />
          <Route path="/tairo-theme" element={<TairoTheme />} />
          <Route path="/tairo-result" element={<TairoResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; // ✅ `export default` 추가
