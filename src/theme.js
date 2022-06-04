import {createTheme} from "@mui/material/styles";
import {faIR} from "@mui/material/locale";


export default createTheme({
  palette: {
    pink: {
      main: 'rgba(0,255,0,0.7)'
    }
  },
  direction: 'rtl',
  typography: {
    allVariants: {
      fontFamily: "Vazirmatn FD,sans-serif",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.7em',
          fontFamily: "Vazirmatn FD,sans-serif",
        }
      }
    }
  }
}, faIR)