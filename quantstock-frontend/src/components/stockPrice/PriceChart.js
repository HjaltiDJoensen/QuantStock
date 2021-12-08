import React from 'react'
// import HighchartsReact from 'highcharts-react-official'
// import Highcharts from "highcharts/highstock";
// import { ChartOptions } from './ChartOptions';
import moment from 'moment'
import HighChart from '../ui/HighChart';
// import priceData from './assets/btcdata.json'

// import DarkUnica from "highcharts/themes/dark-unica";

// DarkUnica(Highcharts);


function PriceChart(props) {
    const options1 = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options1);

    const options = {
        yAxis: [{
            offset: 20,

            labels: {
                formatter: function () {
                    return numberFormat.format(this.value)
                }
                ,
                x: -15,
                style: {
                    "color": "#000", "position": "absolute"

                },
                align: 'left'
            },
        },

        ],
        tooltip: {
            // shared: true,
            formatter: function () {
                return ['<b>' + moment(this.x).format('MMMM Do YYYY, h:mm') + '</b>'].concat(
                    this.points ?
                        this.points.map(function (point) {
                            return numberFormat.format(point.y, 0) + '</b><br/>'
                        }) : []
                );
                // return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
            },
            split: true,
        },
        plotOptions: {
            series: {
                showInNavigator: true,
                gapSize: 6,

            }
        },
        chart: {
            height: 830,
        },
        credits: {
            enabled: false
        },

        legend: {
            enabled: true
        },
        xAxis: {
            ordinal: false,
            // type: 'date',
        },
        rangeSelector: {
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d',
            }, {
                type: 'day',
                count: 7,
                text: '7d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            },
            {
                type: 'year',
                count: 1,
                text: '1y'
            },
            {
                type: 'year',
                count: 5,
                text: '5y'
            },
            {
                type: 'all',
                text: 'MAX'
            }],
            selected: 4
        },
        series: props.stocks.map((stock, index) => ({
            name: stock,
            color: props.color[index],
            data: props.priceData[index],
            tooltip: {
                valueDecimals: 2
            }
        })
        ),

        // [
        //     {
        //         name: "MSFT",
        //         color: "#57A9DE",
        //         data: props.priceData[0],
        //         tooltip: {
        //             valueDecimals: 2
        //         },
        //     },
        //     {
        //         name: "AAPL",
        //         color: "#FF0000",
        //         data: props.priceData[1],
        //         tooltip: {
        //             valueDecimals: 2
        //         },
        //     }
        // ],


        // title: {
        //     text: <div><Button variant="contained">Default</Button></div>,
        // },
        // navigation: {
        //     buttonOptions: {
        //         align: 'center'
        //     }
        // },
        exporting: {
            buttons: {
                customButton: {
                    text: 'Custom Button',
                    onclick: function () {
                        alert('You pressed the button!');
                    }
                },
                anotherButton: {
                    text: 'Another Button',
                    onclick: function () {
                        alert('You pressed another button!');
                    }
                }
            }
        }
    };

    // const options = ChartOptions(props.priceData)


    // const options1Data = [
    //     {
    //         name: "signal",
    //         color: "#57A9DE",
    //         data: props.priceData[0]
    //     },
    //     {
    //         name: "noise",
    //         color: "#FF0000",
    //         data: props.priceData[1]
    //     }
    // ];

    return (
        <div>
            <HighChart
                options={options}
            />
        </div>
    );
}

export default PriceChart;