import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="landing" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
