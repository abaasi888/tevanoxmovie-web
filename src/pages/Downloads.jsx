import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Paper,
  LinearProgress,
} from '@mui/material';
import { Delete, PlayArrow, Download as DownloadIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Downloads = () => {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading downloads
    setTimeout(() => {
      setDownloads([
        {
          id: 1,
          title: 'The Matrix',
          type: 'movie',
          poster: 'https://via.placeholder.com/150x225',
          size: '2.4 GB',
          progress: 100,
          status: 'completed',
        },
        {
          id: 2,
          title: 'Inception',
          type: 'movie',
          poster: 'https://via.placeholder.com/150x225',
          size: '1.8 GB',
          progress: 45,
          status: 'downloading',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    setDownloads(downloads.filter((d) => d.id !== id));
  };

  if (downloads.length === 0 && !loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#888', mb: 2 }}>
          📭 No Downloads
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Download movies, series, and music to watch offline
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: '#FF4757' }}
          onClick={() => navigate('/browse')}
        >
          Browse Content
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        📥 Downloads
      </Typography>

      <Grid container spacing={2}>
        {downloads.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper
              sx={{
                bgcolor: '#1a1a2e',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 80, height: 120, borderRadius: 1 }}
                image={item.poster}
                alt={item.title}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  {item.type} • {item.size}
                </Typography>
                {item.status === 'completed' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Button
                      size="small"
                      startIcon={<PlayArrow />}
                      sx={{ color: '#FF4757' }}
                    >
                      Play
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DownloadIcon />}
                      sx={{ color: '#4CAF50' }}
                    >
                      Open File
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        bgcolor: '#2a2a3e',
                        '& .MuiLinearProgress-bar': { bgcolor: '#FF4757' },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      Downloading... {item.progress}%
                    </Typography>
                  </Box>
                )}
              </Box>
              <IconButton onClick={() => handleDelete(item.id)} sx={{ color: '#888' }}>
                <Delete />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Downloads;