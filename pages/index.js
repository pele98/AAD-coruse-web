// import React and our routing dependencies
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import our routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

// define our routes
const Pages = props => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="mynotes" element={<MyNotes/>} />
        <Route path="favorites" element={<Favorites/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
