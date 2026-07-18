import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  History,
  Payment,
  Settings,
  Subscriptions,
  Logout,
  Edit,
  Close,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import Loading from '../components/common/Loading';

const Profile = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  if (loading) {
    return <Loading message="Loading profile..." />;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
  };

  const handleSave = async () => {
    try {
      await updateProfile(editData);
      showToast('Profile updated successfully!', 'success');
      setOpenEditDialog(false);
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      showToast('Logged out successfully', 'info');
    } catch (error) {
      showToast('Failed to logout', 'error');
    }
  };

  const menuItems = [
    { icon: <Subscriptions />, label: 'My Subscription', onClick: () => navigate('/subscription') },
    { icon: <History />, label: 'Watch History', onClick: () => navigate('/history') },
    { icon: <Payment />, label: 'Payment Methods', onClick: () => navigate('/payment') },
    { icon: <Settings />, label: 'Settings', onClick: () => navigate('/settings') },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              color: 'white',
            }}
          >
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: '#e50914',
                  fontSize: 40,
                }}
              >
                {user.name?.[0] || 'U'}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {user.email}
                </Typography>
                {user.phone && (
                  <Typography variant="body2" color="text.secondary">
                    {user.phone}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{ bgcolor: '#e50914', '&:hover': { bgcolor: '#b20710' } }}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Name" secondary={user.name} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              {user.phone && (
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary="Phone" secondary={user.phone} />
                </ListItem>
              )}
              {user.address && (
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary="Address" secondary={user.address} />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={item.onClick}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              <ListItem
                button
                onClick={handleLogout}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'error.light',
                  },
                }}
              >
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Profile
          <IconButton
            onClick={handleCloseEdit}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              value={editData.address}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ bgcolor: '#e50914', '&:hover': { bgcolor: '#b20710' } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
