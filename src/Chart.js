import React, { Component } from "react";
import Calculation from "./CalculationEngine";

import {
  withStyles,
} from "@material-ui/core";

import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Line,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

const styles = theme => ({

});

class Chart extends Component {
  
  render() {
    const { initial, monthly, timescale, risk, target } = this.props;
    const calcEngine = new Calculation(initial, monthly, timescale);
    const data = calcEngine.getChartData(risk);

    return (
      <ComposedChart
        width={550}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, dataMax => { return target>dataMax?target+100:dataMax}]}/>
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <ReferenceLine y={target} label="Target Value" stroke="red" strokeDasharray="3 3"/>
        <Area
          type="monotone"
          dataKey="wideBand"
          stroke="#4891DA"
          fill="#4891DA"
          strokeWidth="0"
          fillOpacity="1"
        />

        <Area
          type="monotone"
          dataKey="narrowBand"
          stroke="#84c47f"
          strokeWidth="0"
          fill="#84c47f"
          fillOpacity="1"
        />
        <Line
          type="monotone"
          dataKey="invested"
          stroke="#F18934"
          strokeWidth="1"
        />
      </ComposedChart>
    );
  }
}

export default withStyles(styles)(Chart);
