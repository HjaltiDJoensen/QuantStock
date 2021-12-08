import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts/highstock";

function HighChart(props) {
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                // containerProps={{ style: { height: "100%" } }}
                options={props.options}
                constructorType={"stockChart"}
            />
        </div>
    );
}

export default HighChart;
