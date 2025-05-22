import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#589156',
      main: '#467e45',
      dark: '#346c34',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#f1f6f1',
      main: '#e3ece3',
      dark: '#cfd8cf',
      contrastText: '#467e45',
    },
    background: {
      default: '#f4f4f4',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

theme.components = {
  MuiDataGrid: {
    styleOverrides: {
      columnHeaders: {
          backgroundColor: theme.palette.primary.main,
          fontWeight: 'bold',
      },
      columnHeader: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.contrastText,
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'Capitalize',
      },
    },
  },
};

export default theme;