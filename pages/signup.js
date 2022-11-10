import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = () => {
  const { setLoggedIn } = useContext(UserContext);
  const [values, setValues] = useState();
  const navigate = useNavigate();

  const client = useApolloClient();

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

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      <h2>Sign up</h2>
      <Form
        onSubmit={e => {
          e.preventDefault();
          signUp({variables: {...values}});
        }}
      >
        <label htmlFor='username'>Username: </label>
        <input
          required
          type='text'
          id='username'
          name='username'
          placeholder='Username...'
          onChange={e => onChange(e)}
        />
        <label htmlFor='email'>Email: </label>
        <input
          required
          type='email'
          id='email'
          name='email'
          placeholder='Email...'
          onChange={e => onChange(e)}
        />
        <label htmlFor='password'>Password: </label>
        <input
          required
          type='password'
          id='password'
          name='password'
          placeholder='Password...'
          onChange={e => onChange(e)}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </Wrapper>
  );
};

export default SignUp;