import React, { useState, useEffect, useRef } from 'react';
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
  Slider,
  IconButton,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Download,
  Favorite,
  Share,
  SkipNext,
  SkipPrevious,
  Repeat,
  Shuffle,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material';
import { useMusic } from '../hooks/useMusic';
import { useStreaming } from '../hooks/useStreaming';

const MusicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { getMusic, loading, error } = useMusic();
  const { getStreamingUrl, getDownloadUrl } = useStreaming();
  const [music, setMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    loadMusic();
  }, [id]);

  const loadMusic = async () => {
    const data = await getMusic(id);
    if (data) {
      setMusic(data);
      setDuration(data.duration || 0);
    }
  };

  const handlePlay = async () => {
    if (!user?.is_active) {
      navigate('/subscription');
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = async () => {
    if (!user?.is_active) {
      navigate('/subscription');
      return;
    }
    const result = await getDownloadUrl(id, 'music');
    if (result?.download_url) {
      window.open(result.download_url, '_blank');
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !music) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Music not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Cover Art */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={music.cover_art || 'https://via.placeholder.com/400x400'}
            alt={music.title}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>

        {/* Info */}
        <Grid item xs={12} md={7}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {music.title}
          </Typography>
          <Typography variant="h5" sx={{ color: '#aaa', mt: 1 }}>
            {music.artist}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
            {music.album && <Chip label={`Album: ${music.album}`} size="small" />}
            {music.release_year && <Chip label={music.release_year} size="small" />}
            {music.duration && <Chip label={formatTime(music.duration)} size="small" />}
            <Chip label={music.category} size="small" color="primary" />
          </Stack>

          {music.genre?.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Genres:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                {music.genre.map((g, i) => (
                  <Chip key={i} label={g} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          )}

          {/* Music Player */}
          <Box sx={{ mt: 3, bgcolor: '#1a1a2e', p: 3, borderRadius: 2 }}>
            <audio
              ref={audioRef}
              src={music.audio_url}
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              onLoadedData={(e) => setDuration(e.target.duration)}
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Progress */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ color: '#888', minWidth: 40 }}>
                {formatTime(currentTime)}
              </Typography>
              <Slider
                value={currentTime}
                max={duration}
                onChange={(e, v) => {
                  setCurrentTime(v);
                  if (audioRef.current) {
                    audioRef.current.currentTime = v;
                  }
                }}
                sx={{
                  color: '#FF4757',
                  '& .MuiSlider-track': { bgcolor: '#FF4757' },
                  '& .MuiSlider-rail': { bgcolor: '#333' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#888', minWidth: 40 }}>
                {formatTime(duration)}
              </Typography>
            </Box>

            {/* Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2 }}>
              <IconButton sx={{ color: '#888' }}>
                <Shuffle />
              </IconButton>
              <IconButton sx={{ color: '#888' }}>
                <SkipPrevious />
              </IconButton>
              <IconButton
                onClick={handlePlay}
                sx={{
                  bgcolor: '#FF4757',
                  color: '#fff',
                  '&:hover': { bgcolor: '#CC1A2C' },
                  width: 56,
                  height: 56,
                }}
                disabled={!user?.is_active}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton sx={{ color: '#888' }}>
                <SkipNext />
              </IconButton>
              <IconButton sx={{ color: '#888' }}>
                <Repeat />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={() => setIsMuted(!isMuted)} sx={{ color: '#888' }}>
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
                <Slider
                  value={isMuted ? 0 : volume}
                  onChange={(e, v) => {
                    setVolume(v);
                    if (audioRef.current) {
                      audioRef.current.volume = v / 100;
                    }
                    setIsMuted(false);
                  }}
                  sx={{
                    width: 100,
                    color: '#FF4757',
                    '& .MuiSlider-track': { bgcolor: '#FF4757' },
                    '& .MuiSlider-rail': { bgcolor: '#333' },
                  }}
                />
              </Box>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleDownload}
                disabled={!user?.is_active}
                sx={{ color: '#4CAF50', borderColor: '#4CAF50' }}
              >
                Download
              </Button>
            </Box>

            {!user?.is_active && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                <strong>Subscription Required</strong> — Subscribe to listen and download music.
              </Alert>
            )}
          </Box>

          {music.lyrics && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Lyrics
              </Typography>
              <Box sx={{ bgcolor: '#1a1a2e', p: 2, borderRadius: 2, maxHeight: 200, overflow: 'auto' }}>
                <Typography variant="body2" sx={{ color: '#aaa', whiteSpace: 'pre-wrap' }}>
                  {music.lyrics}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MusicDetail;