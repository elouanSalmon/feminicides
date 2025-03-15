import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: 'rgb(161, 50, 184)',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
  },
});