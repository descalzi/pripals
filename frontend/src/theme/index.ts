import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#58CC02', // Vibrant green
      light: '#7EE817',
      dark: '#46A302',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF9600', // Bright orange
      light: '#FFA733',
      dark: '#CC7700',
      contrastText: '#fff',
    },
    background: {
      default: '#F7F7F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3C3C3C',
      secondary: '#777777',
    },
    error: {
      main: '#EA2B2B',
    },
    success: {
      main: '#58CC02',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 800,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.12)',
    '0px 8px 16px rgba(0, 0, 0, 0.14)',
    '0px 12px 24px rgba(0, 0, 0, 0.16)',
    '0px 16px 32px rgba(0, 0, 0, 0.18)',
    '0px 20px 40px rgba(0, 0, 0, 0.20)',
    '0px 24px 48px rgba(0, 0, 0, 0.22)',
    '0px 28px 56px rgba(0, 0, 0, 0.24)',
    '0px 32px 64px rgba(0, 0, 0, 0.26)',
    '0px 36px 72px rgba(0, 0, 0, 0.28)',
    '0px 40px 80px rgba(0, 0, 0, 0.30)',
    '0px 44px 88px rgba(0, 0, 0, 0.32)',
    '0px 48px 96px rgba(0, 0, 0, 0.34)',
    '0px 52px 104px rgba(0, 0, 0, 0.36)',
    '0px 56px 112px rgba(0, 0, 0, 0.38)',
    '0px 60px 120px rgba(0, 0, 0, 0.40)',
    '0px 64px 128px rgba(0, 0, 0, 0.42)',
    '0px 68px 136px rgba(0, 0, 0, 0.44)',
    '0px 72px 144px rgba(0, 0, 0, 0.46)',
    '0px 76px 152px rgba(0, 0, 0, 0.48)',
    '0px 80px 160px rgba(0, 0, 0, 0.50)',
    '0px 84px 168px rgba(0, 0, 0, 0.52)',
    '0px 88px 176px rgba(0, 0, 0, 0.54)',
    '0px 92px 184px rgba(0, 0, 0, 0.56)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.15)',
          '&:active': {
            transform: 'translateY(2px)',
            boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 6px 0px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #E5E5E5',
          boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

// League-specific colors
export const leagueColors = {
  PRIMIUM: {
    primary: '#FFD700', // Gold
    secondary: '#9333EA', // Purple
    gradient: 'linear-gradient(135deg, #FFD700 0%, #9333EA 100%)',
  },
  PRIME: {
    primary: '#C0C0C0', // Silver
    secondary: '#3B82F6', // Blue
    gradient: 'linear-gradient(135deg, #C0C0C0 0%, #3B82F6 100%)',
  },
  PRIMITIVES: {
    primary: '#CD7F32', // Bronze
    secondary: '#6B7280', // Gray
    gradient: 'linear-gradient(135deg, #CD7F32 0%, #6B7280 100%)',
  },
};
