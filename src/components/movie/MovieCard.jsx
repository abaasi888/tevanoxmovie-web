import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, width = 200, height = 300 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
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
          height={height}
          image={movie.poster_url || 'https://via.placeholder.com/200x300'}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        {movie.vj_name && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'rgba(255,71,87,0.9)',
              px: 1,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" sx={{ color: '#fff', fontSize: 10 }}>
              🎤 {movie.vj_name}
            </Typography>
          </Box>
        )}
        <CardContent sx={{ p: 1.5 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: '#fff', fontWeight: 600, fontSize: 14 }}
            noWrap
          >
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#888' }}>
              {movie.release_year}
            </Typography>
            {movie.average_rating > 0 && (
              <Rating
                value={movie.average_rating}
                readOnly
                size="small"
                precision={0.5}
                sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }}
              />
            )}
          </Box>
          {movie.category && (
            <Chip
              label={movie.category}
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

export default MovieCard;