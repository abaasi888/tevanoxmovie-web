import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MusicCard = ({ music, width = 200 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/music/${music.id}`);
  };

  return (
    <Card
      sx={{
        width,
        bgcolor: '#1a1a2e',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height={200}
          image={music.cover_art || 'https://via.placeholder.com/200x200'}
          alt={music.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 1.5 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: '#fff', fontWeight: 600, fontSize: 14 }}
            noWrap
          >
            {music.title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#888' }} noWrap>
            {music.artist}
          </Typography>
          {music.category && (
            <Chip
              label={music.category}
              size="small"
              sx={{
                mt: 1,
                bgcolor: 'rgba(255,71,87,0.1)',
                color: '#FF4757',
                fontSize: 10,
                height: 20,
              }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MusicCard;