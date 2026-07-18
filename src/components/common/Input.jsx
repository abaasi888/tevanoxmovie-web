import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  helperText,
  fullWidth = true,
  margin = 'normal',
  size = 'medium',
  icon,
  onIconClick,
  multiline = false,
  rows = 1,
  disabled = false,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        error={!!error}
        fullWidth={fullWidth}
        margin={margin}
        size={size}
        multiline={multiline}
        rows={multiline ? rows : 1}
        disabled={disabled}
        required={required}
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start" onClick={onIconClick} style={{ cursor: 'pointer' }}>
              {icon}
            </InputAdornment>
          ),
          endAdornment: isPassword && (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2a2a3e',
            },
            '&:hover fieldset': {
              borderColor: '#FF4757',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF4757',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#888',
            '&.Mui-focused': {
              color: '#FF4757',
            },
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
        }}
        {...props}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </>
  );
};

export default Input;