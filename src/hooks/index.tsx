import React from 'react';
import { AuthProvider } from './auth';
import { FiltersProvider } from './filters';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <FiltersProvider>
      {children}
    </FiltersProvider>
  </AuthProvider>
);

export default AppProvider;
