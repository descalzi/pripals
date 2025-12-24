import { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemButton, ListItemText, Button, Alert } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { League, Friend, POINT_REASONS } from '../types';
import { apiClient } from '../api/client';
import LeagueCard from '../components/LeagueCard';
import EmptyState from '../components/EmptyState';
import banner from '../assets/banner.png';
import { useNavigate } from 'react-router-dom';

const LeaguesPage = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [pointDialogOpen, setPointDialogOpen] = useState(false);
  const [pointDialogMode, setPointDialogMode] = useState<'add' | 'remove'>('add');

  const fetchLeagues = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getLeagues();
      setLeagues(data);
    } catch (err) {
      setError('Failed to load leagues. Make sure the backend is running.');
      console.error('Error fetching leagues:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const handleAddPoints = (friend: Friend) => {
    setSelectedFriend(friend);
    setPointDialogMode('add');
    setPointDialogOpen(true);
  };

  const handleRemovePoints = (friend: Friend) => {
    setSelectedFriend(friend);
    setPointDialogMode('remove');
    setPointDialogOpen(true);
  };

  const handlePointReasonSelect = async (points: number, reason: string) => {
    if (!selectedFriend) return;

    try {
      await apiClient.addPoints(selectedFriend.id, { points, reason });
      setPointDialogOpen(false);
      setSelectedFriend(null);
      // Refresh leagues
      await fetchLeagues();
    } catch (err) {
      console.error('Error adding points:', err);
      alert('Failed to update points');
    }
  };

  const handleCloseDialog = () => {
    setPointDialogOpen(false);
    setSelectedFriend(null);
  };

  const availableReasons = POINT_REASONS.filter(r =>
    pointDialogMode === 'add' ? r.points > 0 : r.points < 0
  );

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Loading leagues...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchLeagues}>
          Retry
        </Button>
      </Container>
    );
  }

  const hasNoFriends = leagues.every(league => league.friends.length === 0);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          component="img"
          src={banner}
          alt="Pri-Pals"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 3,
            boxShadow: 3,
            mb: 2,
          }}
        />
      </Box>

      {hasNoFriends ? (
        <EmptyState
          icon={EmojiEventsOutlinedIcon}
          title="No friends in leagues yet!"
          message="Start adding friends and giving them points to see them compete in the Pri-Pals leagues. Who will make it to Primium?"
          actionText="Add Friends"
          onAction={() => navigate('/friends')}
        />
      ) : (
        leagues.map((league) => (
          <LeagueCard
            key={league.type}
            league={league}
            onAddPoints={handleAddPoints}
            onRemovePoints={handleRemovePoints}
          />
        ))
      )}

      {/* Points Dialog */}
      <Dialog open={pointDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {pointDialogMode === 'add' ? 'Add Points' : 'Remove Points'}
          {selectedFriend && (
            <Typography variant="body2" color="text.secondary">
              {selectedFriend.name}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <List>
            {availableReasons.map((reason) => (
              <ListItem key={reason.label} disablePadding>
                <ListItemButton
                  onClick={() => handlePointReasonSelect(reason.points, reason.label)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    border: '1px solid',
                    borderColor: reason.points > 0 ? 'success.main' : 'error.main',
                  }}
                >
                  <ListItemText
                    primary={reason.label}
                    secondary={`${reason.points > 0 ? '+' : ''}${reason.points} points`}
                    secondaryTypographyProps={{
                      color: reason.points > 0 ? 'success.main' : 'error.main',
                      fontWeight: 700,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default LeaguesPage;
