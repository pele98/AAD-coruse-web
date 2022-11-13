import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

const Pages = () => {

  const { loggedIn, setRedirectBack } = useContext(UserContext);

  const privateRoute = (route, signInAddress) => {
    if (loggedIn) return route;
    else {
      setRedirectBack(true);
      return <Navigate to={signInAddress} />;
    }
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="mynotes" element={privateRoute(<MyNotes/>, '../signin')} />
          <Route path="favorites" element={privateRoute(<Favorites/>, '../signin')} />
          <Route path="new" element={privateRoute(<NewNote/>, '../signin')} />
          <Route path="edit/:id" element={privateRoute(<EditNote/>, '../signin')} />
          <Route path="note/:id" element={<NotePage/>} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="signin" element={<SignIn/>} />
        </Routes>
      </ Layout>
    </BrowserRouter>
  );
};

export default Pages;
