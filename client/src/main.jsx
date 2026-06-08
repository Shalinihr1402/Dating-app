import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import './styles.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e54768'
    },
    secondary: {
      main: '#127a75'
    },
    background: {
      default: '#fff8f3'
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'].join(',')
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
