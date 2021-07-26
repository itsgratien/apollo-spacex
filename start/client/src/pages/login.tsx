import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Loading, LoginForm } from '../components';
import * as LoginTypes from './__generated__/login';
import { isLoggedInVar } from '../cache';

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
      id
    }
  }
`;
const Login = () => {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(LOGIN_USER, {
    onCompleted: (res) => {
      if (res.login) {
        localStorage.setItem('token', res.login.token as string);

        localStorage.setItem('userId', res.login.id as string);

        isLoggedInVar(true);
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
};

export default Login;
