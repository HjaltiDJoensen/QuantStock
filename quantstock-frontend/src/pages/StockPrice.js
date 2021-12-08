import React, { useState, useEffect } from 'react'
import PriceChart from '../components/stockPrice/PriceChart'
import StockPriceSidebar from '../components/stockPrice/StockPriceSidebar'
import { FetchStockData } from '../components/stockPrice/FetchStockData'
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    priceChart: {
        marginRight: drawerWidth,
    },
    sideBar: {

    }
}));


function StockPricePage() {
    const classes = useStyles();
    const [stocks, setStocks] = useState(['MSFT', 'AAPL']);
    const [tempStocks, setTempStocks] = useState(['MSFT', 'AAPL']);
    const [allStocks, setAllStocks] = useState([]);
    const color = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
    const [priceData, setPriceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch(
            'http://127.0.0.1:8000/company/?get_all=true'
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const companies = data.map((company) => company.name);
                setAllStocks(companies);
            });
    }, []);



    useEffect(() => {
        FetchStockData(
            tempStocks,
            priceData,
            setPriceData,
            setIsLoading
        )
    }, [tempStocks])


    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.priceChart}>
                <PriceChart
                    stocks={stocks}
                    priceData={priceData}
                    color={color}
                />
            </div>
            <div>
                <StockPriceSidebar
                    stocks={stocks}
                    setStocks={setStocks}
                    color={color}
                    allStocks={allStocks}
                    setTempStocks={setTempStocks}
                />
            </div>
        </div>
    )
}

export default StockPricePage;