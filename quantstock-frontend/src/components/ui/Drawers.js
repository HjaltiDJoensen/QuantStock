import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        // background: '#2E3B55',
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
}));

function Drawers(props) {
    const classes = useStyles();
    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor={props.anchor}
                open={props.sidebarOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}></div>
                {props.children}
            </Drawer>
        </div>
    );
}


export default Drawers;