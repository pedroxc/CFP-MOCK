import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

import LoadingPage from '../pages/LoadingPage';

interface LoadingContextData {
  loading: boolean;
  handleLoading(state: boolean): void;
}
const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData,
);

const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleLoading = useCallback((state: boolean) => {
    setLoading(state);
  }, []);
  return (
    <LoadingContext.Provider value={{ loading, handleLoading }}>
      {loading && <LoadingPage />}
      {children}
    </LoadingContext.Provider>
  );
};

function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading needs LoadingProvider');
  }
  return context;
}

export { LoadingProvider, useLoading };
