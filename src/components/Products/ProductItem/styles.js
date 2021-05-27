import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
  },
  // Product Image
  media: {
    // width:'20px',
    height: 0,
    paddingTop: '56.25%', // 16:9
    // border: 'solid red'
  },

  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));