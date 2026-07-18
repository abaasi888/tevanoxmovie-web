import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#0a0a1a', color: '#888', py: 4, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              🎬 TevanoxMovie
            </Typography>
            <Typography variant="body2">
              Movies & Music - Unlimited Entertainment
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              © 2024 Tevanox. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Quick Links
            </Typography>
            <Link href="/browse" color="inherit" display="block" sx={{ mb: 1 }}>
              Browse
            </Link>
            <Link href="/subscription" color="inherit" display="block" sx={{ mb: 1 }}>
              Subscribe
            </Link>
            <Link href="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQ
            </Link>
            <Link href="/support" color="inherit" display="block">
              Support
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2">Email: support@tevanox.com</Typography>
            <Typography variant="body2">Phone: +256 XXX XXX XXX</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Kampala, Uganda
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;