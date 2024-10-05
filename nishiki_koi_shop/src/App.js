import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import các thành phần từ react-router-dom
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Header from './pages/Header.js';

function App() {
  return (

      <div className="App">
          <Router>
                  <Header/>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
            </Router>
      </div>

  );
}

export default App;
