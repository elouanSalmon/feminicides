import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box, Container, CssBaseline, Grid, AppBar, Toolbar, Tabs, Tab, Typography, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import CustomMarker from './components/CustomMarker';
import CasesList from './components/CasesList';
import 'leaflet/dist/leaflet.css';
import './App.css';
import Statistics from './components/Statistics';
import About from './components/About';

import theme from './theme';

const App = () => {
  const cases = useSelector((state) => state.feminicide.filteredCases);
  const status = useSelector((state) => state.feminicide.status);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Tabs value={currentTab} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
              <Tab label="Carte" />
              <Tab label="Statistiques" />
              <Tab label="À Propos" />
            </Tabs>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, display: currentTab === 0 ? 'block' : 'none' }}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={12} md={4} sx={{ height: '100%', overflow: 'auto', flex: 1, minHeight: 0 }}>
            <Container>
              <CasesList cases={cases} />
            </Container>
          </Grid>
          <Grid item xs={12} md={8} sx={{ height: '100%' }}>
            <MapContainer
              center={[46.603354, 1.888334]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
              ref={(map) => {
                if (map) {
                  window.mapInstance = map;
                }
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {cases.map((caseItem, index) => (
                <CustomMarker
                  key={`${caseItem.date}-${caseItem.city}-${index}`}
                  position={[caseItem.latitude, caseItem.longitude]}
                  name={caseItem.name}
                  date={caseItem.date}
                  city={caseItem.city}
                  age={caseItem.age}
                  link={caseItem.link}
                />
              ))}
            </MapContainer>
          </Grid>
        </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, p: 2, display: currentTab === 1 ? 'block' : 'none' }}>
          <Statistics />
        </Box>

        <Box sx={{ flexGrow: 1, p: 2, display: currentTab === 2 ? 'block' : 'none' }}>
          <About />
        </Box>
      </Box>

      <Box component="footer" sx={{ marginTop: '2rem', p: '1.5rem', backgroundColor: 'background.default' }}>
        <Container>
          <Typography variant="body2" color="textSecondary" align="center">
            Données fournies par 
            <Link href="https://www.noustoutes.org/" color="primary">
              Nous Toutes
            </Link>
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;