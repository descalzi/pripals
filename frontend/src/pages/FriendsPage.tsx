import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Fab,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Friend, PointHistoryEntry } from '../types';
import { apiClient } from '../api/client';
import FriendCard from '../components/FriendCard';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import PointHistoryChart from '../components/PointHistoryChart';
import bannerFriends from '../assets/banner_friends.png';

const FriendsPage = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null);
  const [pointHistory, setPointHistory] = useState<PointHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [isCouple, setIsCouple] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const fetchFriends = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getFriends();
      setFriends(data);
    } catch (err) {
      setError('Failed to load friends. Make sure the backend is running.');
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleOpenDialog = async (friend?: Friend) => {
    if (friend) {
      setSelectedFriend(friend);
      setName(friend.name);
      setPartnerName(friend.partnerName || '');
      setIsCouple(friend.isCouple);
      setImagePreview(friend.profilePicture);

      // Load point history for existing friend
      setLoadingHistory(true);
      try {
        const history = await apiClient.getPointHistory(friend.id);
        setPointHistory(history);
      } catch (err) {
        console.error('Error loading point history:', err);
        setPointHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    } else {
      setSelectedFriend(null);
      setName('');
      setPartnerName('');
      setIsCouple(false);
      setImageFile(null);
      setImagePreview('');
      setPointHistory([]);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedFriend(null);
    setName('');
    setPartnerName('');
    setIsCouple(false);
    setImageFile(null);
    setImagePreview('');
    setPointHistory([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }

    try {
      let profilePicture = imagePreview;

      // Upload image if a new one was selected
      if (imageFile) {
        profilePicture = await apiClient.uploadImage(imageFile);
      } else if (!profilePicture) {
        // Use a default avatar if no image
        profilePicture = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=58CC02&color=fff`;
      }

      if (selectedFriend) {
        // Update existing friend
        await apiClient.updateFriend(selectedFriend.id, {
          name,
          partnerName: isCouple ? partnerName : undefined,
          isCouple,
          profilePicture,
        });
      } else {
        // Create new friend
        await apiClient.createFriend({
          name,
          partnerName: isCouple ? partnerName : undefined,
          isCouple,
          profilePicture,
        });
      }

      handleCloseDialog();
      await fetchFriends();
    } catch (err) {
      console.error('Error saving friend:', err);
      alert('Failed to save friend');
    }
  };

  const handleDeleteClick = (friend: Friend) => {
    setFriendToDelete(friend);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!friendToDelete) return;

    try {
      await apiClient.deleteFriend(friendToDelete.id);
      setDeleteDialogOpen(false);
      setFriendToDelete(null);
      await fetchFriends();
    } catch (err) {
      console.error('Error deleting friend:', err);
      alert('Failed to delete friend');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setFriendToDelete(null);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Loading friends...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3, pb: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          component="img"
          src={bannerFriends}
          alt="Friends"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 3,
            boxShadow: 3,
            mb: 2,
          }}
        />
        <Typography variant="body2" color="text.secondary" align="center">
          {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {friends.length === 0 ? (
        <EmptyState
          icon={PeopleOutlineIcon}
          title="No friends yet"
          message="Get started by adding your first friend! Click the + button below to begin building your friend leagues."
          actionText="Add Your First Friend"
          onAction={() => handleOpenDialog()}
        />
      ) : (
        <Box>
          {friends.map((friend) => (
            <Box key={friend.id} sx={{ position: 'relative' }}>
              <FriendCard friend={friend} onClick={() => handleOpenDialog(friend)} />
              <IconButton
                color="error"
                onClick={() => handleDeleteClick(friend)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Add Friend FAB */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpenDialog()}
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedFriend ? 'Edit Friend' : 'Add Friend'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {selectedFriend && (
              <Box sx={{ mb: 3 }}>
                {loadingHistory ? (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : (
                  <PointHistoryChart history={pointHistory} />
                )}
              </Box>
            )}

            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isCouple}
                  onChange={(e) => setIsCouple(e.target.checked)}
                />
              }
              label="This is a couple"
              sx={{ mb: 2 }}
            />

            {isCouple && (
              <TextField
                fullWidth
                label="Partner Name"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {imagePreview && (
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: 128,
                    height: 128,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedFriend ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Friend"
        message={`Are you sure you want to delete ${friendToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        danger
      />
    </Container>
  );
};

export default FriendsPage;
