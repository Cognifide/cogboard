import { createMuiTheme } from '@material-ui/core/styles';
import { amber, blue, green, red } from '@material-ui/core/colors/index';
import { COLORS } from './constants';

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '12px'
        },
        '*::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.4)',
          borderRadius: '10px'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px'
        }
      }
    },
    MuiCardHeader: {
      action: {
        marginTop: 0,
        marginRight: 0
      }
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: COLORS.BLUE
    },
    secondary: {
      main: COLORS.BKGD_DARK
    },
    background: {
      default: COLORS.BKGD_LIGHT,
      paper: COLORS.BLUE,
      board: {
        card: COLORS.BLUE,
        dragged: COLORS.LIGHT_BLUE
      }
    },
    status: {
      TRANSPARENT: COLORS.TRANSPARENT,
      CHECKBOX_OK: COLORS.GREEN,
      CHECKBOX_FAIL: COLORS.RED,
      CHECKBOX_UNKNOWN: COLORS.PURPLE,
      NONE: COLORS.PURPLE,
      UNKNOWN: COLORS.PURPLE,
      OK: COLORS.GREEN,
      IN_PROGRESS: COLORS.BLUE,
      UNSTABLE: COLORS.ORANGE,
      ERROR_CONNECTION: COLORS.RED,
      ERROR_CONFIGURATION: COLORS.RED,
      ERROR: COLORS.RED,
      FAIL: COLORS.RED,
      DISABLED: COLORS.GREY
    },
    snackbarVariant: {
      info: blue[100],
      success: green[300],
      warning: amber[700],
      error: red[800]
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    h3: {
      fontWeight: 500,
      letterSpacing: 2
    }
  }
});
