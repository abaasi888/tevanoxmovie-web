import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useMovies } from '../hooks/useMovies';
import { useMusic } from '../hooks/useMusic';
import { useSeries } from '../hooks/useSeries';
import MovieCard from '../components/movie/MovieCard';
import MusicCard from '../components/music/MusicCard';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { searchMovies } = useMovies();
  const { searchMusic } = useMusic();
  const { searchSeries } = useSeries();

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'series', label: 'Series' },
    { id: 'music', label: 'Music' },
  ];

  useEffect(() => {
    if (query.length > 1) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [query, activeTab]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const type = tabs[activeTab].id;
      let movieResults = [];
      let seriesResults = [];
      let musicResults = [];

      if (type === 'all' || type === 'movies') {
        movieResults = await searchMovies(query);
      }
      if (type === 'all' || type === 'series') {
        seriesResults = await searchSeries(query);
      }
      if (type === 'all' || type === 'music') {
        musicResults = await searchMusic(query);
      }

      const combined = [
        ...movieResults.map((m) => ({ ...m, type: 'movie' })),
        ...seriesResults.map((s) => ({ ...s, type: 'series' })),
        ...musicResults.map((m) => ({ ...m, type: 'music' })),
      ];
      setResults(combined);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchParams({ q: value });
  };

  const renderResult = (item) => {
    if (item.type === 'movie') {
      return <MovieCard movie={item} />;
    } else if (item.type === 'series') {
      return <MovieCard movie={item} />;
    } else if (item.type === 'music') {
      return <MusicCard music={item} />;
    }
    return null;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Search
      </Typography>

      <TextField
        fullWidth
        placeholder="Search for movies, series, music..."
        value={query}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#888' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            bgcolor: '#1a1a2e',
            '& fieldset': { borderColor: '#2a2a3e' },
            '&:hover fieldset': { borderColor: '#FF4757' },
            '&.Mui-focused fieldset': { borderColor: '#FF4757' },
          },
          '& .MuiInputBase-input': { color: '#fff' },
        }}
      />

      {query.length > 1 && (
        <>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                color: '#888',
                '&.Mui-selected': { color: '#FF4757' },
              },
              '& .MuiTabs-indicator': { bgcolor: '#FF4757' },
            }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.id} label={`${tab.label} (${results.filter(r => tab.id === 'all' || r.type === tab.id).length})`} />
            ))}
          </Tabs>

          {loading ? (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress sx={{ color: '#FF4757' }} />
            </Box>
          ) : results.length > 0 ? (
            <Grid container spacing={2}>
              {results.map((item, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                  {renderResult(item)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" py={8}>
              <Typography variant="h6" sx={{ color: '#888' }}>
                No results found for "{query}"
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                Try searching with different keywords
              </Typography>
            </Box>
          )}
        </>
      )}

      {query.length <= 1 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" sx={{ color: '#888' }}>
            Start typing to search
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
            Search for movies, series, music, artists, and more
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Search;