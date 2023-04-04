import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material';

const themeStyle = createTheme({
  typography: {
    fontSize: 24,
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    // text:{
    //   primary: "red"
    // }
  }
});

export default themeStyle;