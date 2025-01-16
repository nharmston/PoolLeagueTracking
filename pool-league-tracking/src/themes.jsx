import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      light: grey[400],
      main: grey[600],
      dark: grey[700],
      darker: grey[900],
    },
  },
});
