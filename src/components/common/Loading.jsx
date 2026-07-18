import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Loading...', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#0a0a1a',
        }}
      >
        <CircularProgress sx={{ color: '#FF4757' }} size={60} />
        <Typography variant="h6" sx={{ color: '#aaa', mt: 3 }}>
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <CircularProgress sx={{ color: '#FF4757' }} />
      <Typography variant="body2" sx={{ color: '#aaa', mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;