import React from 'react';
import { Paper, Typography, Box, Container, Link } from '@mui/material';

const About = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom color="primary.main" sx={{ mb: 4 }}>
          À Propos de ce Projet
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="primary.main">
            Notre Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Ce projet vise à documenter et à sensibiliser sur les féminicides en France. 
            Chaque point sur la carte représente une vie perdue, une histoire qui mérite d'être 
            racontée et rappelée. Les féminicides touchent toutes les tranches d'âges et concernent 
            l'ensemble du territoire. Notre objectif est de donner une visibilité à ces tragédies 
            pour contribuer à la prévention de la violence contre les femmes. 
            Pour en savoir plus, rendez-vous sur{' '}
            <Link href="https://www.noustoutes.org" target="_blank" rel="noopener noreferrer">
              noustoutes.org
            </Link>.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="primary.main">
            Les Données
          </Typography>
          <Typography variant="body1" paragraph>
            Les informations présentées sur ce site sont collectées par nous toutes et sont accessibles via{' '}
            <Link href="https://www.data.gouv.fr/fr/datasets/decompte-et-recensement-des-feminicides/" target="_blank" rel="noopener noreferrer">
              ce lien
            </Link>.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="primary.main">
            Comment Utiliser ce Site
          </Typography>
          <Typography variant="body1" paragraph>
            La carte interactive permet de visualiser la répartition géographique des féminicides. 
            Vous pouvez cliquer sur les marqueurs pour obtenir plus d'informations sur chaque cas. 
            La section statistiques fournit une analyse des données dans le temps pour 
            mieux comprendre ce phénomène.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom color="primary.main">
            Ressources et Aide
          </Typography>
          <Typography variant="body1" paragraph>
            Si vous ou quelqu'un que vous connaissez êtes en danger :
          </Typography>
          <Typography variant="body1" component="div" sx={{ pl: 2 }}>
            • Police Secours : 17<br />
            • Violences Femmes Info : 3919 (anonyme et gratuit)<br />
            • SMS d'urgence : 114<br />
            • En cas d'urgence immédiate, appelez le 112
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default About;
