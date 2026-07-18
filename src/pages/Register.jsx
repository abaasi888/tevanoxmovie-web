import React from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';

const Register = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, bgcolor: '#1a1a2e' }}>
        <Typography variant="h4" sx={{ color: '#fff', textAlign: 'center', mb: 3 }}>Create Account</Typography>
        <TextField fullWidth label="Username" margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#888' } }} />
        <TextField fullWidth label="Email" margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#888' } }} />
        <TextField fullWidth label="Password" type="password" margin="normal" sx={{ input: { color: '#fff' }, label: { color: '#888' } }} />
        <Button fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#FF4757' }}>Register</Button>
      </Paper>
    </Container>
  );
};
export default Register;
