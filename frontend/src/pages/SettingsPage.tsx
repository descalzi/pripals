import { Box, Typography, Container, Card, CardContent, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import bannerSettings from '../assets/banner_settings.png';

const SettingsPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          component="img"
          src={bannerSettings}
          alt="Settings"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 3,
            boxShadow: 3,
            mb: 2,
          }}
        />
      </Box>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">About Pri-Pals</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" paragraph>
            Pri-Pals is a fun, friendly app to rank your friends into leagues based on points.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            <strong>Leagues:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ ml: 2 }}>
            • <strong>Primium</strong> - The Elite. Instant text replies; invited to the "secret" group chat.<br />
            • <strong>Prime</strong> - The Inner Circle. Gets a birthday shoutout; allowed to suggest dinner spots<br />
            • <strong>Primitives</strong> - The Bottom Tier. Lucky if they get a "like" on their IG story
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center">
            Version 1.0.0
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
            Made with ❤️ by Martin
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SettingsPage;
