import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import Layout from './components/Layout';

// Auto-detect base path from current location
// Works with /pripals, root /, or any other prefix
const getBasename = () => {
  const path = window.location.pathname;
  // If path starts with /pripals, use that as basename
  if (path.startsWith('/pripals')) {
    return '/pripals';
  }
  // Otherwise, use root
  return '/';
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={getBasename()}>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
