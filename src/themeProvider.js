import { defaultTheme } from 'react-admin';

const myTheme = {
  ...defaultTheme,
  palette: {
    type: 'light',
    primary: {
      main: '#780f03',
    },
    secondary: {
      main: '#d8cf28',
      contrastText: '#142a3d',
    },
    info: {
      main: '#d8cf28',
    },
    background: {
      default: '#efe9e1',
      paper: '#fffef0',
    },
    text: {
      primary: '#142a3d',
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
};

export default myTheme;
