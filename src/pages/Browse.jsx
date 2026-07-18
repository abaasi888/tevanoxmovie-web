import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useMovies } from '../hooks/useMovies';
import { useMusic } from '../hooks/useMusic';
import { useSeries } from '../hooks/useSeries';
import MovieCard from '../components/movie/MovieCard';
import MusicCard from '../components/music/MusicCard';
import Loading from '../components/common/Loading';

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getMoviesByCategory, searchMovies } = useMovies();
  const { getMusicByCategory } = useMusic();
  const { getSeriesByCategory } = useSeries();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ugandan', label: '🇺🇬 Ugandan' },
    { id: 'english', label: '🌍 English' },
    { id: 'luganda_translated', label: '🗣️ Luganda' },
    { id: 'swahili_translated', label: '🗣️ Swahili' },
  ];

  const tabs = [
    { id: 'movies', label: 'Movies' },
    { id: 'series', label: 'Series' },
    { id: 'music', label: 'Music' },
  ];

  useEffect(() => {
    loadContent();
  }, [activeTab, category, sortBy, page, searchQuery]);

  const loadContent = async () => {
    setLoading(true);
    try {
      let data = [];
      const type = tabs[activeTab].id;

      if (searchQuery) {
        if (type === 'movies') data = await searchMovies(searchQuery);
        else if (type === 'music') data = await searchMusic(searchQuery);
        else if (type === 'series') data = await searchSeries(searchQuery);
      } else {
        const cat = category === 'all' ? null : category;
        if (type === 'movies') data = await getMoviesByCategory(cat);
        else if (type === 'music') data = await getMusicByCategory(cat);
        else if (type === 'series') data = await getSeriesByCategory(cat);
      }

      // Sort data
      if (sortBy === 'latest') {
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sortBy === 'popular') {
        data.sort((a, b) => (b.total_views || 0) - (a.total_views || 0));
      } else if (sortBy === 'rating') {
        data.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
      }

      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const renderContent = () => {
    const type = tabs[activeTab].id;
    const displayContent = content.slice((page - 1) * 20, page * 20);

    if (loading) {
      return <Loading message="Loading content..." />;
    }

    if (content.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ color: '#888' }}>
            No content found
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
            Try adjusting your filters or search query
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Grid container spacing={2}>
          {displayContent.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.id}>
              {type === 'movies' && <MovieCard movie={item} />}
              {type === 'series' && <MovieCard movie={item} />}
              {type === 'music' && <MusicCard music={item} />}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(content.length / 20)}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#aaa',
              },
              '& .Mui-selected': {
                bgcolor: '#FF4757 !important',
                color: '#fff',
              },
            }}
          />
        </Box>
      </>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Browse
      </Typography>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            color: '#888',
            '&.Mui-selected': {
              color: '#FF4757',
            },
          },
          '& .MuiTabs-indicator': {
            bgcolor: '#FF4757',
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} />
        ))}
      </Tabs>

      {/* Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#888' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#1a1a2e',
              '& fieldset': { borderColor: '#2a2a3e' },
            },
            '& .MuiInputBase-input': { color: '#fff' },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#888' }}>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            sx={{
              bgcolor: '#1a1a2e',
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#888' }}>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            label="Sort By"
            sx={{
              bgcolor: '#1a1a2e',
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2a2a3e' },
            }}
          >
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="popular">Most Popular</MenuItem>
            <MenuItem value="rating">Top Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Content */}
      {renderContent()}
    </Container>
  );
};

export default Browse;