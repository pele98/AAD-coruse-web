import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';
import SignUp from './signup';

const Pages = props => {

  const { loggedIn } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="mynotes" element={!loggedIn ? <Navigate to='../signup' />: <MyNotes/>} />
          <Route path="favorites" element={!loggedIn ? <Navigate to='../signup' />: <Favorites/>} />
          <Route path="note/:id" element={!loggedIn ? <Navigate to='../signup' />: <NotePage/>} />
          <Route path="signup" element={<SignUp/>} />
        </Routes>
      </ Layout>
    </BrowserRouter>
  );
};

export default Pages;
