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

  // Calculate total victims since 2023 and yearly breakdown
  const victimsSince2023 = cases.filter(caseItem => {
    const caseYear = parseInt(caseItem.date.split('/')[2]);
    return caseYear >= 2023;
  });

  const totalVictimsSince2023 = victimsSince2023.length;

  const yearlyBreakdown = victimsSince2023.reduce((acc, caseItem) => {
    const year = caseItem.date.split('/')[2];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const yearlyData = Object.entries(yearlyBreakdown)
    .map(([year, count]) => ({
      year,
      count,
    }))
    .sort((a, b) => a.year.localeCompare(b.year));

  // Calculate monthly distribution since 2023
  const monthlyDistribution = cases.reduce((acc, caseItem) => {
    const [day, month, year] = caseItem.date.split('/');
    if (parseInt(year) >= 2023) {
      const key = `${year}-${month}`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});

  const monthlyData = Object.entries(monthlyDistribution)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography variant="h5" gutterBottom color="primary.main">
        Statistiques des Féminicides
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Nombre total de victimes recencées depuis 2023: {totalVictimsSince2023}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Répartition annuelle des victimes recencées depuis 2023
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Distribution par Mois (depuis 2023)
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

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
      </Grid>
    </Paper>
  );
};

export default Statistics;