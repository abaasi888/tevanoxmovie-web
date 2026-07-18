import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MusicCard from './MusicCard';

const MusicList = ({ title, music, seeAllLink = null }) => {
  const navigate = useNavigate();

  if (!music || music.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {seeAllLink && (
          <Button
            size="small"
            sx={{ color: '#FF4757' }}
            onClick={() => navigate(seeAllLink)}
          >
            See All
          </Button>
        )}
      </Box>
      <Grid container spacing={2}>
        {music.slice(0, 6).map((item) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
            <MusicCard music={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MusicList;