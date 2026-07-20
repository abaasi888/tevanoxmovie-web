import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    Box, 
    TextField, 
    Button, 
    Paper, 
    Alert,
    Link 
} from '@mui/material';
import apiClient from '../api/client';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        console.log('📤 Registering user:', formData);
        
        try {
            const response = await apiClient.post('/auth/register', formData);
            console.log('✅ Registration successful:', response.data);
            setSuccess(true);
            
            if (response.data.token) {
                localStorage.setItem('access_token', response.data.token);
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err) {
            console.error('❌ Registration error:', err);
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper sx={{ p: 4, bgcolor: '#1a1a2e' }}>
                <Typography variant="h4" sx={{ color: '#fff', textAlign: 'center', mb: 3 }}>
                    Create Account
                </Typography>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>Registration successful! Redirecting...</Alert>}
                
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="username"
                        label="Username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="normal"
                        required
                        sx={{ input: { color: '#fff' }, label: { color: '#888' } }}
                    />
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        sx={{ input: { color: '#fff' }, label: { color: '#888' } }}
                    />
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        sx={{ input: { color: '#fff' }, label: { color: '#888' } }}
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, bgcolor: '#FF4757', '&:hover': { bgcolor: '#CC1A2C' } }}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>
                
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                        Already have an account?{' '}
                        <Link 
                            component="button"
                            onClick={() => navigate('/login')} 
                            sx={{ color: '#FF4757', cursor: 'pointer' }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
