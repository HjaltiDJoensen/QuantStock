import React, { useState } from 'react';
import Dialogs from "../ui/Dialogs";


export default function AddNewStock(props) {
    const [stockSymbol, setStockSymbol] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRetryButton = () => {
        setNotFound(false)
    }

    const handleAddButton = () => {
        setLoading(true)
        fetch("http://127.0.0.1:8000/company/",
            {
                method: 'POST',
                body: JSON.stringify({ name: stockSymbol }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                setLoading(false)
                if (!response.ok) {
                    throw new Error('error => stock symbol was not valid')
                } else {
                    props.handleCloseAddnewStock()
                    window.location.reload();
                }
            }
            )
            .catch(err => {
                console.error(err)
                setNotFound(true)
            })
    };

    return (
        <div>
            {
                notFound ?
                    <Dialogs
                        openAddnewStock={props.openAddnewStock}
                        handleCloseAddnewStock={props.handleCloseAddnewStock}
                        title={"No Match"}
                        text={'There was no match for the stock symbol'}
                        textfield={false}
                        button1={true}
                        button1text={"Cancel"}
                        button2={true}
                        button2text={"Retry"}
                        handleAddButton={handleRetryButton}
                    />
                    :
                    <Dialogs
                        openAddnewStock={props.openAddnewStock}
                        handleCloseAddnewStock={props.handleCloseAddnewStock}
                        title={"Add New Stock"}
                        text={'To add a new stock, you need to enter the stock symbol, e.g. "MSFT", "AAPL" etc.'}
                        textfield={true}
                        setStockSymbol={setStockSymbol}
                        button1={true}
                        button1text={"Cancel"}
                        button2={true}
                        button2text={"Add"}
                        handleAddButton={handleAddButton}
                        loading={loading}
                    />
            }
        </div>
    );
}