import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import {useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import useStyles from '../estilosPropios'

const SideBarMenu = (props) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    //Función para desplegable
    const handleClick = () => {
        setOpen(!open);
    };
    //Función constante para navBar
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    //Función constante para dibujar el navegador
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.menu}
            >
                <ListItem button>
                    <ListItemText primary="DASHBOARD" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="REPORTES ADMIN" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="REPORTES ADMIN" />
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="VENTAS" />
                    </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    )
}

export default SideBarMenu
