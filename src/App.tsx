import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import darkTheme from './styles/themes/dark';
import GlobalStyle from './styles/global';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  const [theme] = useState(darkTheme);

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <Routes />
        </Router>
        <GlobalStyle />
      </AppProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
