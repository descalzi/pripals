import { Box, Typography, Paper } from '@mui/material';
import { League, Friend } from '../types';
import { leagueColors } from '../theme';
import FriendCard from './FriendCard';

interface LeagueCardProps {
  league: League;
  onFriendClick?: (friend: Friend) => void;
  onAddPoints?: (friend: Friend) => void;
  onRemovePoints?: (friend: Friend) => void;
}

const LeagueCard = ({ league, onFriendClick, onAddPoints, onRemovePoints }: LeagueCardProps) => {
  const colors = leagueColors[league.type];

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 3,
        overflow: 'hidden',
        borderRadius: 3,
      }}
    >
      {/* League Header */}
      <Box
        sx={{
          background: colors.gradient,
          p: 3,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.5px',
          }}
        >
          {league.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            opacity: 0.95,
            fontStyle: 'italic',
          }}
        >
          {league.description}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            display: 'block',
            opacity: 0.9,
          }}
        >
          {league.friends.length} {league.friends.length === 1 ? 'friend' : 'friends'}
        </Typography>
      </Box>

      {/* Friends List */}
      <Box sx={{ p: 2 }}>
        {league.friends.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">
              No friends in this league yet
            </Typography>
          </Box>
        ) : (
          league.friends.map((friend, index) => (
            <Box key={friend.id} sx={{ position: 'relative' }}>
              {/* Rank Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  bgcolor: colors.primary,
                  color: 'white',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  boxShadow: 2,
                }}
              >
                {index + 1}
              </Box>
              <Box sx={{ ml: 3 }}>
                <FriendCard
                  friend={friend}
                  onClick={onFriendClick}
                  onAddPoints={onAddPoints}
                  onRemovePoints={onRemovePoints}
                />
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
};

export default LeagueCard;
