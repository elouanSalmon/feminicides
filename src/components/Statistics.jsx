import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Statistics = () => {
  const theme = useTheme();
  const cases = useSelector((state) => state.feminicide.cases);

  // Calculate age distribution
  const ageDistribution = cases.reduce((acc, caseItem) => {
    const ageGroup = Math.floor(caseItem.age / 10) * 10;
    const key = `${ageGroup}-${ageGroup + 9}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const ageData = Object.entries(ageDistribution)
    .map(([range, count]) => ({
      range,
      count,
    }))
    .sort((a, b) => parseInt(a.range) - parseInt(b.range));

  // Calculate region distribution
  const regionDistribution = cases.reduce((acc, caseItem) => {
    const region = caseItem.region || 'Non spécifié';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  const regionData = Object.entries(regionDistribution)
    .map(([region, count]) => ({
      region,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography variant="h5" gutterBottom color="primary.main">
        Statistiques des Féminicides
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Distribution par Âge
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Distribution par Région
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={regionData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="region" />
                <Tooltip />
                <Bar dataKey="count" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Statistics;