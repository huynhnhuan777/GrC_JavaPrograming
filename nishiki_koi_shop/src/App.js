import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import các thành phần từ react-router-dom
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Đảm bảo path là đúng */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
