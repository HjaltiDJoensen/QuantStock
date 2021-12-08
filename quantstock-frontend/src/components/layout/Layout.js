import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    drawerHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: 0,
        // marginLeft: 120,
        // marginRight: 120,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
}));


function Layout(props) {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleSidebarOpen = () => {
        sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };
    return (
        <div className={classes.root}>
            <NavigationBar
                sidebarOpen={sidebarOpen}
                handleSidebarOpen={handleSidebarOpen}
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                handleSidebarOpen={handleSidebarOpen}
                handleSidebarClose={handleSidebarClose}
                setSidebarOpen={setSidebarOpen}
            />
            <main
                className={classes.content}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>

        </div>
    );
}

export default Layout;
