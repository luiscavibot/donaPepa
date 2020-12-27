import { makeStyles} from '@material-ui/core/styles';
//constantes
const drawerWidth = 278;
//Función a exportar
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    display: 'flex',
  },
  menu: {
    width: '100%',
    // display: 'flex',
  },
  nested: {
    paddingLeft: '41px',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#D31A2B',
    color: 'white',
    paddingLeft: '34px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
}));

export default useStyles