import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

const Button = ({
  children,
  loading = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  sx = {},
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        ...(variant === 'contained' && color === 'primary' && {
          bgcolor: '#FF4757',
          '&:hover': { bgcolor: '#CC1A2C' },
        }),
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
  );
};

export default Button;