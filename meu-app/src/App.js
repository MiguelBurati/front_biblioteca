import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddLivro from './components/AddLivro';
import { useState } from 'react';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addLivro" element={<AddLivro />} />
      </Routes>
    </Router>
  );
}

export default App;
