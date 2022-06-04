import {makeStyles} from 'tss-react/mui';

export default makeStyles()(() => ({
  chart:{
    fontFamily: "IRAN, san-serif",
  },
  income: {
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
  },
  expense: {
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
  },
}));