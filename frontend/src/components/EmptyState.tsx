import { Box, Typography, Button } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface EmptyStateProps {
  icon?: SvgIconComponent;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon: Icon, title, message, actionText, onAction }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 3,
      }}
    >
      {Icon && (
        <Box
          sx={{
            display: 'inline-flex',
            p: 3,
            borderRadius: '50%',
            bgcolor: 'action.hover',
            mb: 3,
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}
        >
          <Icon
            sx={{
              fontSize: 64,
              color: 'text.secondary',
              opacity: 0.5,
            }}
          />
        </Box>
      )}

      <Typography variant="h5" gutterBottom fontWeight={700}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
        {message}
      </Typography>

      {actionText && onAction && (
        <Button
          variant="contained"
          size="large"
          onClick={onAction}
          sx={{
            borderRadius: 3,
            px: 4,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
