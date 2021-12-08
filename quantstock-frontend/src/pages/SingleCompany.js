import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import PriceChart from '../components/stockPrice/PriceChart'
import { FetchStockData } from '../components/stockPrice/FetchStockData'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../redux/index"

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        // marginLeft: 120,
        // marginRight: 120,
    },
    cardtitle: {
        marginBottom: 5,
    },
    cardInfo: {
        display: "flex",
        justifyContent: "space-between"
    },
    priceChart: {
        marginBottom: 40,
    },
}));



function SingleCompanyPage(props) {
    const classes = useStyles();
    const location = useLocation()
    const allData = location.state.allData
    const stocks = [allData.symbol]
    const [priceData, setPriceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const color = ["Blue"];


    const state = useSelector((state) => state.bank);

    // const dispatch = useDispatch();

    //     const { depositMoney, withdrawMoney } = bindActionCreators(actionCreators, dispatch);

    //  {/* <h1>{state}</h1>
    //             <button onClick={() => depositMoney(1000)}>Deposit</button>
    //             <button onClick={() => withdrawMoney(1000)}>Withdraw</button> */}

    useEffect(() => {
        FetchStockData(
            stocks,
            priceData,
            setPriceData,
            setIsLoading
        )
    }, [])

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    const cardData = [
        {
            "title": "Company details",
            "keys": ["Employees",
                "Headquarters",
                "Sector",
                "Industry",
                "Website"
            ],
            "values": [allData.fullTimeEmployees,
            allData.city + ", " + allData.country,
            allData.sector,
            allData.industry,
            <a href={allData.website}> {allData.website} </a>
            ]
        },
        {
            "title": "Statistics",
            "keys": ["Market cap",
                "Price-to-earnings (P/E)",
                "Revenue",
                "EPS",
                "Dividend Yield",
                "Beta"
            ],
            "values": [allData.marketCap,
            allData.trailingPE,
            allData.totalRevenue,
            allData.trailingEps,
            allData.dividendYield === null ? "N/A" : (allData.dividendYield * 100).toString() + "%",
            allData.beta
            ]
        }
    ]


    return (
        <div className={classes.content}>
            <h1>
                {allData.longName + " — " + allData.symbol}
            </h1>
            <div className={classes.priceChart}>
                <PriceChart
                    stocks={stocks}
                    priceData={priceData}
                    color={color}
                />
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {cardData.map((card, index) => (
                        <Grid item xs={4} sm={4} md={4} key={index}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <h3 className={classes.cardtitle}>
                                        {card.title}
                                    </h3>
                                    {card.values.map((_, index1) => (
                                        <div className={classes.cardInfo}>
                                            <Typography className={classes.cardInfo}>
                                                {card.keys[index1]}:
                                            </Typography>
                                            <Typography className={classes.cardInfo}>
                                                {card.values[index1]}
                                            </Typography>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item xs={4} sm={8} md={12} key={"Summary"}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <h3 className={classes.cardtitle}>
                                    Business Summary
                                </h3>
                                <Typography paragraph>
                                    {allData.longBusinessSummary}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default SingleCompanyPage;