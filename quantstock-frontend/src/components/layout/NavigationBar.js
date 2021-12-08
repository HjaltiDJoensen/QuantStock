import React from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';



const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        // marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        // width: '10px',
    },
}));

// {clsx(classes.menuButton, props.sidebarOpen && classes.hide)}

export default function NavigationBar(props) {
    const classes = useStyles();

    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: props.sidebarOpen,
            })}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={props.handleSidebarOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button
                        color="inherit"
                        className={classes.title}
                        component={Link}
                        to="/"
                    >
                        <Typography variant="h6" className={classes.title}>
                            Quant Stock
                        </Typography>
                    </Button>
                    <Button
                        color="inherit"
                        style={{ marginLeft: 'auto' }}
                        component={Link}
                        to="/login"
                    >Login</Button>
                    /
                    <Button
                        color="inherit"
                        style={{ marginLeft: 'auto' }}
                        component={Link}
                        to="/register"
                    >Register</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}