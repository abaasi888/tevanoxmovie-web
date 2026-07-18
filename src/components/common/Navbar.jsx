import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Badge,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Person, Favorite, Download } from '@mui/icons-material';
import { logout } from '../../store/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0a0a1a' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: '#FF4757',
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': { color: '#FF6B7A' },
            }}
          >
            🎬 TevanoxMovie
          </Typography>

          {/* Center Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/browse">
              Browse
            </Button>
            <Button color="inherit" component={Link} to="/subscription">
              Subscribe
            </Button>
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={() => navigate('/search')}>
              <Search />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/downloads')}>
              <Download />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/favorites')}>
              <Badge badgeContent={0} color="error">
                <Favorite />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton color="inherit" onClick={() => navigate('/profile')}>
                  <Person />
                </IconButton>
                <Button color="inherit" onClick={handleLogout} size="small">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: '#FF4757' }}
                  component={Link}
                  to="/register"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;