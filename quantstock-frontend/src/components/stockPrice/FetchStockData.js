import axios from 'axios'

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
}

export const FetchStockData = async (tempStocks, priceData, setPriceData, setIsLoading) => {
    const fetchingStocks = []
    for (const stock of tempStocks) {
        fetchingStocks.push(
            await axios.get(
                'http://127.0.0.1:8000/stock/?company=' + stock + '&interval=1d&period=max&get_all=true'
            )
        )
    }
    axios.all(fetchingStocks).then(
        axios.spread((...allData) => {
            const fethedStocks = allData.map(singleData => singleData.data
                .map((priceDate, i) =>
                    [parseInt(toTimestamp(priceDate.datetime)), parseFloat(priceDate.adj_close)]
                )
            );
            setPriceData([...priceData, ...fethedStocks])
        })
    ).then(() => {
        console.log(priceData)
        setIsLoading(false);
    }
    );
}