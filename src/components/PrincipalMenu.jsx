import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../estilosPropios'

const PrincipalMenu = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const classes = useStyles();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      className={classes.menuButton}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                      Menú Principal
                  </Typography>
              </Toolbar>
            </AppBar>
    )
}

export default PrincipalMenu
