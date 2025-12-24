import { Box, Typography, Container, Card, CardContent, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../assets/logo.png';

const SettingsPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          component="img"
          src={logo}
          alt="Pri-Pals Logo"
          sx={{
            width: 120,
            height: 'auto',
            mb: 2,
          }}
        />
        <Typography variant="h3" color="primary" gutterBottom>
          Settings
        </Typography>
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
            • <strong>Primium</strong> - The Elite (Top 3)<br />
            • <strong>Prime</strong> - The Inner Circle (Next 5)<br />
            • <strong>Primitives</strong> - The Bottom Tier
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center">
            Version 1.0.0
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
            Made with ❤️ using React & FastAPI
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SettingsPage;
