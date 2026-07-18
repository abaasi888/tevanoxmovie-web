import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const Toast = ({
  open,
  message,
  severity = 'success',
  onClose,
  autoHideDuration = 3000,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;