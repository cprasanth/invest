import React, { Component } from "react";
import Calculation from "./CalculationEngine";
import Chart from "./Chart";

import {
  withStyles,
  Typography,
  TextField,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Paper,
  InputAdornment
} from "@material-ui/core";

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
    risk: "0",
    data: []
  };
  updateChart = () => {
    
  }
  componentDidMount(){
    this.updateChart();
  }
  handleChange = prop => event => {
    if(prop==="risk"){
      this.setState({ [prop]: event.target.value });
    }else{
      this.setState({ [prop]: Number(event.target.value) });
    }
    console.log(this.state.initial,this.state.monthly,this.state.timescale, this.state.risk)
    if (this.state.monthly > 0 && this.state.timescale > 0) {
      let calcEngine = new Calculation(
        this.state.initial,
        this.state.monthly,
        this.state.timescale
      );
      this.setState({ data: calcEngine.getChartData(this.state.risk) });
      this.forceUpdate();
    }



    this.updateChart();
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item sm={12} lg={6}>
            <form>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="initial">Lump Sum Investment</InputLabel>
                <Input
                  id="initial"
                  value={this.state.initial}
                  onChange={this.handleChange('initial')}
                  startAdornment={<InputAdornment position="start">£</InputAdornment>}
                />
              </FormControl>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="monthly">Monthly Investment</InputLabel>
                <Input
                  id="monthly"
                  value={this.state.monthly}
                  onChange={this.handleChange('monthly')}
                  startAdornment={<InputAdornment position="start">£</InputAdornment>}
                />
              </FormControl>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="target">Target Value</InputLabel>
                <Input
                  id="target"
                  value={this.state.target}
                  onChange={this.handleChange('target')}
                  startAdornment={<InputAdornment position="start">£</InputAdornment>}
                />
              </FormControl>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="timescale">Timescale (years)</InputLabel>
                <Input
                  id="timescale"
                  value={this.state.timescale}
                  onChange={this.handleChange('timescale')}
                />
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Risk Level</FormLabel>
                <RadioGroup
                  aria-label="Risk Level"
                  name="risk"
                  className={classes.group}
                  value={this.state.risk}
                  onChange={this.handleChange('risk')}
                >
                  <FormControlLabel value="0" control={<Radio />} label="Low" />
                  <FormControlLabel value="1" control={<Radio />} label="Medium" />
                  <FormControlLabel value="2" control={<Radio />} label="High" />
                </RadioGroup>
              </FormControl>
            </form>
          </Grid>
          <Grid item sm={12} lg={6}>
            <Chart initial={this.state.initial} monthly={this.state.monthly} timescale={this.state.timescale} target={this.state.target}  target={this.state.target} risk={this.state.risk} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Calculator);
