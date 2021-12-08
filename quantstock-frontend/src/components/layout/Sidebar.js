import React from 'react';
import { Link } from "react-router-dom";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BusinessIcon from '@material-ui/icons/Business';
import Drawers from '../ui/Drawers'
import HomeIcon from '@material-ui/icons/Home';


// const useStyles = makeStyles((theme) => ({
//     drawerHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         padding: theme.spacing(0, 1),
//         // necessary for content to be below app bar
//         ...theme.mixins.toolbar,
//         justifyContent: 'flex-end',
//     },
//     drawerClose: {
//         transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen
//         }),
//         overflowX: "hidden",
//         width: theme.spacing.unit * 7 + 1,
//         [theme.breakpoints.up("sm")]: {
//             width: theme.spacing.unit * 9 + 1
//         }
//     },
// }));


export default function Sidebar(props) {
    // const classes = useStyles();
    // const theme = useTheme();

    return (
        <div>
            <Drawers
                anchor={"left"}
                sidebarOpen={props.sidebarOpen}
            >
                {/* <div className={classes.drawerHeader}>
                    <IconButton onClick={props.handleSidebarClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div> */}
                <List>
                    <ListItem
                        button
                        component={Link}
                        to="/"
                        key={"Home"}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        component={Link}
                        to="/stock-price"
                        key={"stockPrice"}
                    >
                        <ListItemIcon>
                            <ShowChartIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Stock Price"} />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/companies"
                        key={"companies"}
                    >
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Companies"} />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/favorites"
                        key={"favorites"}
                    >
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Favorites"} />
                    </ListItem>
                </List>
                <Divider />
            </Drawers>
        </div>
    );
}