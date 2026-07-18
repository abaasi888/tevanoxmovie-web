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
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import {
  PlayArrow,
  Download,
  Favorite,
  Share,
  Star,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useSeries } from '../hooks/useSeries';
import { useStreaming } from '../hooks/useStreaming';

const SeriesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { getSeries, loading, error } = useSeries();
  const { getStreamingUrl, getDownloadUrl } = useStreaming();
  const [series, setSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [expandedSeasons, setExpandedSeasons] = useState({});

  useEffect(() => {
    loadSeries();
  }, [id]);

  const loadSeries = async () => {
    const data = await getSeries(id);
    if (data) {
      setSeries(data);
      setEpisodes(data.episodes_list || []);
    }
  };

  const handlePlayEpisode = async (episode) => {
    if (!user?.is_active) {
      navigate('/subscription');
      return;
    }
    const result = await getStreamingUrl(episode.id, 'series');
    if (result?.streaming?.hls) {
      navigate(`/player/series/${episode.id}`, {
        state: { 
          url: result.streaming.hls,
          title: `${series.title} - S${episode.season}E${episode.episode_number}`,
          episode: episode
        }
      });
    }
  };

  const handleDownloadEpisode = async (episode) => {
    if (!user?.is_active) {
      navigate('/subscription');
      return;
    }
    const result = await getDownloadUrl(episode.id, 'series');
    if (result?.download_url) {
      window.open(result.download_url, '_blank');
    }
  };

  const toggleSeason = (season) => {
    setExpandedSeasons({
      ...expandedSeasons,
      [season]: !expandedSeasons[season],
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !series) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Series not found'}</Alert>
      </Container>
    );
  }

  // Group episodes by season
  const episodesBySeason = episodes.reduce((acc, ep) => {
    if (!acc[ep.season]) acc[ep.season] = [];
    acc[ep.season].push(ep);
    return acc;
  }, {});

  const seasons = Object.keys(episodesBySeason).sort();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Poster */}
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={series.poster_url || 'https://via.placeholder.com/300x450'}
            alt={series.title}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>

        {/* Info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {series.title}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mt: 1 }}>
            {series.original_title}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label={series.release_year} size="small" />
            <Chip label={`${series.seasons} Seasons`} size="small" />
            <Chip label={`${series.episodes} Episodes`} size="small" />
            <Chip label={series.category} size="small" color="primary" />
            {series.vj_name && (
              <Chip label={`🎤 ${series.vj_name}`} size="small" color="secondary" />
            )}
            <Box display="flex" alignItems="center">
              <Star sx={{ color: '#FFD700', fontSize: 20 }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {series.average_rating?.toFixed(1) || 'N/A'}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>
            {series.description}
          </Typography>

          {!user?.is_active && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <strong>Subscription Required</strong> — Subscribe to watch and download episodes.
            </Alert>
          )}

          {series.genre?.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Genres:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                {series.genre.map((g, i) => (
                  <Chip key={i} label={g} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Episodes */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Episodes
        </Typography>
        {seasons.map((season) => (
          <Box key={season} sx={{ mb: 2 }}>
            <ListItemButton onClick={() => toggleSeason(season)} sx={{ bgcolor: '#1a1a2e', borderRadius: 1 }}>
              <ListItemText
                primary={`Season ${season}`}
                secondary={`${episodesBySeason[season].length} episodes`}
                sx={{
                  '& .MuiListItemText-primary': { color: '#fff', fontWeight: 600 },
                  '& .MuiListItemText-secondary': { color: '#888' },
                }}
              />
              {expandedSeasons[season] ? <ExpandLess sx={{ color: '#fff' }} /> : <ExpandMore sx={{ color: '#fff' }} />}
            </ListItemButton>
            <Collapse in={expandedSeasons[season]}>
              <List sx={{ bgcolor: '#1a1a2e', borderRadius: 1, mt: 0.5 }}>
                {episodesBySeason[season].map((episode) => (
                  <ListItem
                    key={episode.id}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          startIcon={<PlayArrow />}
                          onClick={() => handlePlayEpisode(episode)}
                          disabled={!user?.is_active}
                          sx={{ color: '#FF4757' }}
                        >
                          Play
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Download />}
                          onClick={() => handleDownloadEpisode(episode)}
                          disabled={!user?.is_active}
                          sx={{ color: '#4CAF50' }}
                        >
                          Download
                        </Button>
                      </Stack>
                    }
                    sx={{
                      borderBottom: '1px solid #2a2a3e',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <ListItemText
                      primary={`E${episode.episode_number}. ${episode.title}`}
                      secondary={`${episode.duration || 0}m`}
                      sx={{
                        '& .MuiListItemText-primary': { color: '#fff' },
                        '& .MuiListItemText-secondary': { color: '#888' },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default SeriesDetail;