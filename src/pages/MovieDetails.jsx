import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PlayArrow, Download, Favorite, Share, Star } from '@mui/icons-material';
import { useMovies } from '../hooks/useMovies';
import { useStreaming } from '../hooks/useStreaming';
import Hls from 'hls.js';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { getMovie, loading, error } = useMovies();
  const { getStreamingUrl, getDownloadUrl } = useStreaming();
  const [movie, setMovie] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    const data = await getMovie(id);
    setMovie(data);
  };

  const handlePlay = async () => {
    if (!user?.is_active) {
      navigate('/subscription');
      return;
    }
    const result = await getStreamingUrl(id, 'movie');
    if (result?.streaming?.hls) {
      setStreamUrl(result.streaming.hls);
      // Initialize HLS player
      if (videoRef) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(result.streaming.hls);
          hls.attachMedia(videoRef);
        }
      }
    }
  };

  const handleDownload = async () => {
    if (!user?.is_active) {
      navigate('/subscription');
      return;
    }
    const result = await getDownloadUrl(id, 'movie');
    if (result?.download_url) {
      window.open(result.download_url, '_blank');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Movie not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={movie.poster_url || 'https://via.placeholder.com/300x450'}
            alt={movie.title}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {movie.title}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mt: 1 }}>
            {movie.original_title}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label={movie.release_year} size="small" />
            <Chip label={`${movie.duration} min`} size="small" />
            <Chip label={movie.category} size="small" color="primary" />
            {movie.vj_name && <Chip label={`🎤 ${movie.vj_name}`} size="small" color="secondary" />}
            <Box display="flex" alignItems="center">
              <Star sx={{ color: '#FFD700', fontSize: 20 }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {movie.average_rating?.toFixed(1) || 'N/A'}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>
            {movie.description}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={handlePlay}
              disabled={!user?.is_active}
              sx={{ bgcolor: '#FF4757' }}
            >
              {user?.is_active ? 'Watch Now' : 'Subscribe to Watch'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleDownload}
              disabled={!user?.is_active}
            >
              Download
            </Button>
            <Button variant="outlined" startIcon={<Favorite />}>
              Favorite
            </Button>
            <Button variant="outlined" startIcon={<Share />}>
              Share
            </Button>
          </Stack>

          {!user?.is_active && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <strong>Subscription Required</strong> — Subscribe to watch and download this content.
            </Alert>
          )}

          {movie.genre?.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Genres:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                {movie.genre.map((g, i) => (
                  <Chip key={i} label={g} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Player */}
      {streamUrl && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <video
            ref={(ref) => setVideoRef(ref)}
            controls
            autoPlay
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Box>
      )}
    </Container>
  );
};

export default MovieDetail;