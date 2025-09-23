import React from 'react';
import { Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Dashboard />
      </Box>
    </AuthProvider>
  );
}

export default App;
