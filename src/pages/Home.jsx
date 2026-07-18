import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
} from '@mui/material';
import { useMovies } from '../hooks/useMovies';
import { useMusic } from '../hooks/useMusic';
import MovieCard from '../components/movie/MovieCard';
import MusicCard from '../components/music/MusicCard';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { trendingMovies, latestMovies, loading: moviesLoading } = useMovies();
  const { trendingMusic, loading: musicLoading } = useMusic();

  const categories = [
    { id: 'ugandan', label: '🇺🇬 Ugandan', color: '#4CAF50' },
    { id: 'english', label: '🌍 English', color: '#2196F3' },
    { id: 'luganda_translated', label: '🗣️ Luganda', color: '#FF9800' },
    { id: 'swahili_translated', label: '🗣️ Swahili', color: '#9C27B0' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero */}
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
          height: { xs: 300, md: 450 },
          background: 'linear-gradient(135deg, #FF4757 0%, #1a1a2e 100%)',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h2" component="h1" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: 28, md: 48 } }}>
            🎬 TevanoxMovie
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.8)', mt: 2 }}>
            Unlimited Movies, Series & Music
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}>
            Watch anytime, anywhere. Download for offline viewing.
          </Typography>
          {!user ? (
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3, bgcolor: '#fff', color: '#FF4757' }}
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          ) : !user.is_active && (
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3, bgcolor: '#FF4757' }}
              onClick={() => navigate('/subscription')}
            >
              Subscribe Now
            </Button>
          )}
        </Box>
      </Box>

      {/* Categories */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Browse by Category
        </Typography>
        <Grid container spacing={2}>
          {categories.map((cat) => (
            <Grid item xs={6} sm={3} key={cat.id}>
              <Card
                sx={{
                  bgcolor: cat.color,
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
                onClick={() => navigate(`/browse?category=${cat.id}`)}
              >
                <CardContent>
                  <Typography variant="h6">{cat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Trending Movies */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          🔥 Trending Movies
        </Typography>
        <Grid container spacing={2}>
          {moviesLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                <Skeleton width="80%" sx={{ mt: 1 }} />
                <Skeleton width="40%" />
              </Grid>
            ))
          ) : (
            trendingMovies?.slice(0, 6).map((movie) => (
              <Grid item xs={6} sm={4} md={2} key={movie.id}>
                <MovieCard movie={movie} onClick={() => navigate(`/movie/${movie.id}`)} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Trending Music */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          🎵 Trending Music
        </Typography>
        <Grid container spacing={2}>
          {musicLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={6} sm={4} md={2} key={i}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              </Grid>
            ))
          ) : (
            trendingMusic?.slice(0, 6).map((music) => (
              <Grid item xs={6} sm={4} md={2} key={music.id}>
                <MusicCard music={music} onClick={() => navigate(`/music/${music.id}`)} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;