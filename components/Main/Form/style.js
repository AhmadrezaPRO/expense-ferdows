import {makeStyles} from 'tss-react/mui';
import {red } from '@mui/material/colors';

export default makeStyles()((theme) => ({
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '-10px',
  },
  button: {
    marginTop: '20px',
    marginRight: "16px",
  },
  calendar:{
    backgroundColor: red[200],
  },
  calendarContainers:{
    direction: 'rtl',
    backgroundColor: 'white',
  },
  centerText:{
    textAlign: "center"
  },
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }
  }
}));