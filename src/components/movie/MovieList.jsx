import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, seeAllLink = null, loading = false }) => {
  const navigate = useNavigate();

  if (!movies || movies.length === 0) {
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
        {movies.slice(0, 6).map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;