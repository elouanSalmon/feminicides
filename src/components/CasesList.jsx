import React from 'react';
import { useSelector } from 'react-redux';
import { Box, List, ListItem, ListItemText, Typography, Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { addNewTabToLinks } from '../utils/linkUtils';

const CasesList = () => {
  const theme = useTheme();
  const cases = useSelector((state) => state.feminicide.cases);

  // Group cases by age
  const casesByAge = cases.reduce((acc, caseItem) => {
    const age = caseItem.age;
    if (!acc[age]) {
      acc[age] = [];
    }
    acc[age].push(caseItem);
    return acc;
  }, {});

  // Sort ages numerically
  const sortedAges = Object.keys(casesByAge).sort((a, b) => 
    parseInt(a) - parseInt(b)
  );

  return (
    <Paper elevation={3} sx={{ flex: 1, minHeight: 0, height: '100%', overflow: 'auto', bgcolor: 'background.paper', transition: 'all 0.3s ease-in-out', '&:hover': { boxShadow: 6 } }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 3, borderBottom: '2px solid', borderColor: 'primary.main', pb: 1 }}>
          Liste des féminicides par âge
        </Typography>
        <List>
          {sortedAges.map((age) => (
            <React.Fragment key={age}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {age} ans
                    </Typography>
                  }
                />
              </ListItem>
              {casesByAge[age].map((caseItem, index) => (
                <ListItem 
                  key={`${age}-${index}`} 
                  onClick={() => {
                    const map = window.mapInstance;
                    if (map) {
                      map.setView([caseItem.latitude, caseItem.longitude], 12, {
                        animate: true,
                        duration: 1
                      });
                    }
                  }}
                  sx={(theme) => ({ 
                    pl: 4, 
                    transition: 'all 0.2s ease-in-out', 
                    '&:hover': { 
                      backgroundColor: theme.palette.primary.main + '80',
                      transform: 'translateX(8px)',
                      cursor: 'pointer'
                    }
                  })}>
                  <ListItemText
                    primary={caseItem.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" display="block">
                          {caseItem.date} - {caseItem.city}
                        </Typography>
                        <Box component="span" dangerouslySetInnerHTML={{ __html: addNewTabToLinks(caseItem.link) }} />
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
              <Divider sx={{ my: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default CasesList;