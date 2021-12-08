import classes from './Card.module.css';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Card(props) {
    return (
        <Link
            className={classes.card}
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
            <button
                className={classes.card__btn}
            >
                Learn more
            </button>
        </Link>
    );
}


export default Card;