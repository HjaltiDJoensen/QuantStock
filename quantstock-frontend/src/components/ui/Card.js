import React from 'react';
import classes from './Card.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    button2: {
        width: "50%",
        color: "red",
    }
}));

function Card(props) {
    const classes2 = useStyles();
    return (
        <div className={classes.card}>
            <Link
                className={classes.card_link}
                to={{
                    pathname: `/single-company/${props.allData.symbol}`,
                    state: { allData: props.allData },
                }}
            >
                <img src={props.img} className={classes.card__img} alt="" />
                <div className={classes.card__body}>
                    <h2 className={classes.card__title}>{props.title}</h2>
                    <p className={classes.card__description}>{props.description}</p>
                </div>
            </Link>
            <div className={classes.buttons}>
                <button
                    className={classes.card__btn}
                >
                    Learn more
                </button>
                <button className={classes.card__btn2} onClick={() => console.log('click!')}>
                    <FavoriteBorderIcon />
                </button>
            </div>
        </div>
    );
}


export default Card;