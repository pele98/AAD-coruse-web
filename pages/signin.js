import React, { useEffect, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = () => {

  const { setLoggedIn, redirectBack, setRedirectBack } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign In — Notedly';
  });

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      setLoggedIn(true);
      if (redirectBack) {
        setRedirectBack(false);
        navigate(-1);
      }
      else navigate('/');
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <>
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </>
  );
};

export default SignIn;