import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = () => {
  const { setLoggedIn } = useContext(UserContext);
  
  const navigate = useNavigate();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      setLoggedIn(true);
      navigate('/');
    }
  });

  useEffect(() => {
    document.title = 'Sign Up — Notedly';
  });

  return (
    <>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </>
  );
};

export default SignUp;