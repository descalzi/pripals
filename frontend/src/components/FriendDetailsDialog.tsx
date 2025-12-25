import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Friend, PointHistoryEntry } from '../types';
import { apiClient } from '../api/client';
import PointHistoryChart from './PointHistoryChart';

interface FriendDetailsDialogProps {
  friend: Friend | null;
  open: boolean;
  onClose: () => void;
}

const FriendDetailsDialog = ({ friend, open, onClose }: FriendDetailsDialogProps) => {
  const [pointHistory, setPointHistory] = useState<PointHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (friend && open) {
      loadPointHistory();
    }
  }, [friend, open]);

  const loadPointHistory = async () => {
    if (!friend) return;

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
  };

  if (!friend) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="span">
          Friend Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Large Profile Picture */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            src={friend.profilePicture}
            alt={friend.name}
            sx={{
              width: 200,
              height: 200,
              margin: '0 auto',
              boxShadow: 4,
              border: '4px solid',
              borderColor: 'primary.main',
            }}
          />
        </Box>

        {/* Friend Name(s) */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            {friend.name}
          </Typography>
          {friend.isCouple && friend.partnerName && (
            <Typography variant="h5" color="text.secondary">
              & {friend.partnerName}
            </Typography>
          )}
          {friend.isCouple && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Couple
            </Typography>
          )}
        </Box>

        {/* Points Display */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 3,
            p: 3,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            {friend.points}
          </Typography>
          <Typography variant="h6">
            {friend.points === 1 ? 'Point' : 'Points'}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Point History Chart */}
        <Box sx={{ mb: 2 }}>
          {loadingHistory ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CircularProgress size={32} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Loading history...
              </Typography>
            </Box>
          ) : (
            <PointHistoryChart history={pointHistory} />
          )}
        </Box>

        {/* Additional Info */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Created: {new Date(friend.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Last updated: {new Date(friend.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FriendDetailsDialog;
