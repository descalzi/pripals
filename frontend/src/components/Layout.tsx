import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import LeaguesPage from '../pages/LeaguesPage';
import FriendsPage from '../pages/FriendsPage';
import SettingsPage from '../pages/SettingsPage';
import trophyIcon from '../assets/trophy.png';
import friendsIcon from '../assets/friends.png';
import settingsIcon from '../assets/settings.png';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(getValueFromPath(location.pathname));

  function getValueFromPath(path: string): number {
    if (path.startsWith('/friends')) return 1;
    if (path.startsWith('/settings')) return 2;
    return 0;
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/friends');
        break;
      case 2:
        navigate('/settings');
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flex: 1, overflow: 'auto', pb: 7 }}>
        <Routes>
          <Route path="/" element={<LeaguesPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels={false}
          sx={{
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              padding: '12px 16px',
              borderRadius: 2,
              margin: '4px',
              transition: 'all 0.3s ease',
            },
            '& .Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
        >
          <BottomNavigationAction
            icon={
              <Box
                component="img"
                src={trophyIcon}
                alt="Leagues"
                sx={{ width: 28, height: 28, transition: 'all 0.2s' }}
              />
            }
          />
          <BottomNavigationAction
            icon={
              <Box
                component="img"
                src={friendsIcon}
                alt="Friends"
                sx={{ width: 28, height: 28, transition: 'all 0.2s' }}
              />
            }
          />
          <BottomNavigationAction
            icon={
              <Box
                component="img"
                src={settingsIcon}
                alt="Settings"
                sx={{ width: 28, height: 28, transition: 'all 0.2s' }}
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Layout;
