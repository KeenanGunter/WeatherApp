import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AppHeader from "./components/general/AppHeader";
import AppFooter from "./components/general/AppFooter";
import Home from "./pages/Home";
import { CssBaseline } from '@mui/material';


function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="flex flex-col min-h-[100dvh] min-w-[375px] bg-blue">
        <AppHeader />

        <div className="flex-grow w-full max-w-[1200px] mx-auto">
          <div className="flex justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>

        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
