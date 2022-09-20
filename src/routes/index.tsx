import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import Layout from '../components/wrapperLayout';

const Routes: React.FC = () => (
  <Layout>
    <AuthRoutes />
    <AppRoutes />
  </Layout>
);

export default Routes;
