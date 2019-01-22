import React, { Component } from "react";
import Calculation from "./CalculationEngine";
import {
  withStyles,
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from "@material-ui/core";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Line,
  Tooltip
} from "recharts";

const styles = theme => ({
  paper: {
    maxWidth: 1200,
    margin: "30px auto",
    boxShadow: "none"
  }
});

class Calculator extends Component {
  state = {
    initial: 1000,
    monthly: 100,
    timescale: 2,
    target: 5000,
    risk: 2,
    data: []
  };  
  redrawChart = () => {
    let calcEngine = new Calculation(
      this.state.initial,
      this.state.monthly,
      this.state.timescale
    );
    this.setState({data: calcEngine.getChartData(this.state.risk)});
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {/* <Typography variant="h1" className={classes.title}>
              Calculator
            </Typography> */}
            <Button onClick={this.redrawChart}>Calculate</Button>
            <ComposedChart
              width={600}
              height={400}
              data={this.state.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />              
              {/* <Area
                type="monotone"
                dataKey="narrowBandUpper"
                stroke="#84c47f"
                strokeWidth="0"
                fill="#84c47f"
                fillOpacity="1"
              />
              <Area
                type="monotone"
                dataKey="narrowBandLower"
                stroke="#84c47f"
                fill="#84c47f"
                strokeWidth="0"
                fillOpacity="1"
              />
              <Area
                type="monotone"
                dataKey="wideBandUpper"
                stroke="#70cbef"
                fill="#70cbef"
                strokeWidth="0"
                fillOpacity="1"
              />
              <Area
                type="monotone"
                dataKey="wideBandLower"
                stroke="#70cbef"
                fill="#70cbef"
                strokeWidth="0"
                fillOpacity="1"
              /> */}
              <Line
                type="monotone"
                dataKey="narrowBandUpper"
                stroke="#84c47f"
                strokeWidth="2"
              />
              <Line
                type="monotone"
                dataKey="narrowBandLower"
                stroke="#84c47f"
                strokeWidth="2"
              />
              <Line
                type="monotone"
                dataKey="wideBandUpper"
                stroke="#70cbef"
                strokeWidth="2"
              />
              <Line
                type="monotone"
                dataKey="wideBandLower"
                stroke="#70cbef"
                strokeWidth="2"
              />
              <Line
                type="monotone"
                dataKey="invested"
                stroke="#ff0000"
                strokeWidth="2"
              />
            </ComposedChart>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Calculator);
