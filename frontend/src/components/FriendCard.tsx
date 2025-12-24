import { Card, CardContent, Avatar, Typography, Box, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Friend } from '../types';

interface FriendCardProps {
  friend: Friend;
  onAddPoints?: (friend: Friend) => void;
  onRemovePoints?: (friend: Friend) => void;
  onClick?: (friend: Friend) => void;
}

const FriendCard = ({ friend, onAddPoints, onRemovePoints, onClick }: FriendCardProps) => {
  const handleCardClick = () => {
    if (onClick) onClick(friend);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddPoints) onAddPoints(friend);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemovePoints) onRemovePoints(friend);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        mb: 2,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': onClick ? {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: 4,
        } : {},
        '&:active': onClick ? {
          transform: 'translateY(-2px) scale(1.01)',
        } : {},
      }}
      onClick={handleCardClick}
    >
      <Avatar
        src={friend.profilePicture}
        alt={friend.name}
        sx={{
          width: 56,
          height: 56,
          mr: 2,
          border: '3px solid',
          borderColor: 'primary.main',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'rotate(5deg) scale(1.1)',
          },
        }}
      >
        {friend.name.charAt(0).toUpperCase()}
      </Avatar>

      <CardContent sx={{ flex: 1, p: 0, '&:last-child': { pb: 0 } }}>
        <Typography variant="h6" component="div" fontWeight={700}>
          {friend.name}
          {friend.isCouple && friend.partnerName && (
            <Typography component="span" variant="h6" color="text.secondary">
              {' & '}{friend.partnerName}
            </Typography>
          )}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight={800}
          >
            {friend.points}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            points
          </Typography>
        </Box>
      </CardContent>

      {(onAddPoints || onRemovePoints) && (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {onRemovePoints && (
            <IconButton
              color="error"
              onClick={handleRemoveClick}
              sx={{
                '&:active': {
                  transform: 'scale(0.9)',
                },
              }}
            >
              <RemoveCircleIcon />
            </IconButton>
          )}
          {onAddPoints && (
            <IconButton
              color="success"
              onClick={handleAddClick}
              sx={{
                '&:active': {
                  transform: 'scale(0.9)',
                },
              }}
            >
              <AddCircleIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Card>
  );
};

export default FriendCard;
