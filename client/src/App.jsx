import { useEffect, useMemo, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { getProfiles, recordSwipe } from './api.js';

const fallbackProfiles = [
  {
    _id: 'local-1',
    name: 'Aisha',
    age: 24,
    location: 'Bengaluru',
    bio: 'Weekend baker, design student, and sunrise walk enthusiast.',
    interests: ['Coffee', 'Art', 'Travel'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    verified: true
  },
  {
    _id: 'local-2',
    name: 'Rohan',
    age: 27,
    location: 'Mumbai',
    bio: 'Product engineer who likes live music, coastal drives, and spicy food.',
    interests: ['Music', 'Startups', 'Food'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    verified: false
  }
];

function App() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likedCount, setLikedCount] = useState(0);

  async function loadProfiles() {
    setLoading(true);
    setError('');

    try {
      const data = await getProfiles();
      setProfiles(data);
    } catch (requestError) {
      setProfiles(fallbackProfiles);
      setError('Using local profiles because the API is not connected yet.');
    } finally {
      setCurrentIndex(0);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfiles();
  }, []);

  const currentProfile = profiles[currentIndex];
  const progressText = useMemo(() => {
    if (!profiles.length) {
      return '0 / 0';
    }

    return `${Math.min(currentIndex + 1, profiles.length)} / ${profiles.length}`;
  }, [currentIndex, profiles.length]);

  async function handleSwipe(action) {
    if (!currentProfile) {
      return;
    }

    if (!String(currentProfile._id).startsWith('local-')) {
      await recordSwipe(currentProfile._id, action).catch(() => {});
    }

    if (action === 'like') {
      setLikedCount((count) => count + 1);
    }

    setCurrentIndex((index) => index + 1);
  }

  return (
    <Box className="app-shell">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="toolbar">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar className="brand-mark">
              <FavoriteIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h6" component="h1">
                MatchNest
              </Typography>
              <Typography variant="caption" color="text.secondary">
                MERN dating app
              </Typography>
            </Box>
          </Stack>
          <Tooltip title="Reload profiles">
            <IconButton onClick={loadProfiles} aria-label="Reload profiles">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="main-grid">
        <Box className="intro-panel">
          <Typography variant="overline" color="primary">
            Discover
          </Typography>
          <Typography variant="h3" component="h2">
            Meet people with shared energy, interests, and plans.
          </Typography>
          <Typography color="text.secondary">
            Browse profiles from MongoDB, like or pass, and record each swipe through the Express API.
          </Typography>
          <Stack direction="row" spacing={2} className="stats-row">
            <Paper className="stat-tile" elevation={0}>
              <Typography variant="h5">{profiles.length}</Typography>
              <Typography variant="caption">profiles</Typography>
            </Paper>
            <Paper className="stat-tile" elevation={0}>
              <Typography variant="h5">{likedCount}</Typography>
              <Typography variant="caption">likes</Typography>
            </Paper>
          </Stack>
        </Box>

        <Paper className="profile-stage" elevation={0}>
          {error ? <Alert severity="info">{error}</Alert> : null}

          {loading ? (
            <Stack alignItems="center" justifyContent="center" className="empty-state">
              <CircularProgress />
            </Stack>
          ) : currentProfile ? (
            <>
              <Box
                className="profile-photo"
                sx={{ backgroundImage: `url(${currentProfile.imageUrl})` }}
              >
                {currentProfile.verified ? (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified"
                    color="secondary"
                    className="verified-chip"
                  />
                ) : null}
              </Box>

              <Box className="profile-content">
                <Stack direction="row" alignItems="baseline" spacing={1}>
                  <Typography variant="h4">{currentProfile.name}</Typography>
                  <Typography variant="h5" color="text.secondary">
                    {currentProfile.age}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.75} alignItems="center" color="text.secondary">
                  <LocationOnIcon fontSize="small" />
                  <Typography>{currentProfile.location}</Typography>
                </Stack>

                <Typography>{currentProfile.bio}</Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {currentProfile.interests.map((interest) => (
                    <Chip key={interest} label={interest} variant="outlined" />
                  ))}
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    {progressText}
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    <Tooltip title="Pass">
                      <IconButton className="swipe-button pass" onClick={() => handleSwipe('pass')}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Like">
                      <IconButton className="swipe-button like" onClick={() => handleSwipe('like')}>
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Box>
            </>
          ) : (
            <Stack alignItems="center" justifyContent="center" spacing={2} className="empty-state">
              <Typography variant="h5">No more profiles</Typography>
              <Button variant="contained" startIcon={<RefreshIcon />} onClick={loadProfiles}>
                Start again
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
