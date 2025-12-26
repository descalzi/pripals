import { Box, Typography, Paper } from '@mui/material';
import { League, Friend } from '../types';
import { leagueColors } from '../theme';
import FriendCard from './FriendCard';
import headerPrimium from '../assets/header_primium.png';
import headerPrime from '../assets/header_prime.png';
import headerPrimitives from '../assets/header_primitives.png';

interface LeagueCardProps {
  league: League;
  onFriendClick?: (friend: Friend) => void;
  onAddPoints?: (friend: Friend) => void;
  onRemovePoints?: (friend: Friend) => void;
}

const leagueHeaders = {
  PRIMIUM: headerPrimium,
  PRIME: headerPrime,
  PRIMITIVES: headerPrimitives,
};

const LeagueCard = ({ league, onFriendClick, onAddPoints, onRemovePoints }: LeagueCardProps) => {
  const colors = leagueColors[league.type];
  const headerImage = leagueHeaders[league.type];

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
          position: 'relative',
          height: 200,
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          pb: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            position: 'relative',
            zIndex: 1,
            color: 'white',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
            opacity: 0.95,
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
