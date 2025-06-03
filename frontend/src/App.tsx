//import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// import AppHeader from './components/general/AppHeader';
// import AppFooter from './components/general/AppFooter';
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <AppHeader /> */}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        
        {/* <AppFooter /> */}
      </div>
    </Router>
  );
}

export default App;

