import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box, Container, CssBaseline, Grid, AppBar, Toolbar, Tabs, Tab, Typography, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import CustomMarker from './components/CustomMarker';
import CasesList from './components/CasesList';
import Statistics from './components/Statistics';
import About from './components/About';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Leaflet default icon configuration
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => {
  const cases = useSelector((state) => state.feminicide.filteredCases);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              Feminicides France
            </Typography>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Carte" />
              <Tab label="Statistiques" />
              <Tab label="À Propos" />
            </Tabs>
          </Toolbar>
        </AppBar>

        {/* Carte */}
        {currentTab === 0 && (
          <Grid container sx={{ flexGrow: 1, height: '100%' }}>
            <Grid item xs={12} md={4} sx={{ overflow: 'auto', bgcolor: 'background.paper' }}>
              <Container sx={{ py: 2 }}>
                <CasesList cases={cases} />
              </Container>
            </Grid>
            <Grid item xs={12} md={8} sx={{ height: '100%' }}>
              <MapContainer
                center={[46.603354, 1.888334]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {cases.map((caseItem, index) => (
                  <CustomMarker
                    key={`${caseItem.date}-${caseItem.city}-${index}`}
                    position={[caseItem.latitude, caseItem.longitude]}
                    {...caseItem}
                  />
                ))}
              </MapContainer>
            </Grid>
          </Grid>
        )}

        {/* Statistiques */}
        {currentTab === 1 && (
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Statistics />
          </Box>
        )}

        {/* À Propos */}
        {currentTab === 2 && (
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <About />
          </Box>
        )}

        {/* Footer */}
        <Box component="footer" sx={{ p: 2, bgcolor: 'background.default', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Données fournies par{' '}
            <Link href="https://www.noustoutes.org/" color="primary">
              Nous Toutes
            </Link>
            {' '} - site développé par{' '}
            <Link href="mailto:elouan.salmon@gmail.com" color="primary">
              Elou
            </Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
