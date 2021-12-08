import moment from 'moment'



export function ChartOptions(priceData) {
    const allOptions = []
    const options1 = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options1);

    for (const prices of priceData) {
        allOptions.push({
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
                shared: true,
                formatter: function () {
                    return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
                }
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
            series: [{
                name: 'MSFT',
                type: 'spline',

                data: prices,
                tooltip: {
                    valueDecimals: 2
                },

            }
            ]
        }
        );
    }


    return allOptions;
}