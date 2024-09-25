import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ImagetoText from './Components/ImagetoText';
import TexttoText from './Components/TexttoText';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ImagetoText />} /> {/* Default route */}
        <Route path="/TexttoText" element={<TexttoText />} />
        <Route path="/ImagetoText" element={<ImagetoText />} />
      </Routes>
      <Footer/>

     
    </Router>
    
  );
}

export default App;
