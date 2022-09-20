import React from 'react';
import Route from './Route';
import SignIn from '../pages/Auth/SignIn';
import ResetPassword from '../pages/Auth/ResetPassword';

const Auth: React.FC = () => (
  <>
    <Route
      exact
      path="/"
      component={SignIn}
      isPrivate={false}
    />
    <Route
      path="/reset-password"
      component={ResetPassword}
      isPrivate={false}
    />
  </>
);

export default Auth;
