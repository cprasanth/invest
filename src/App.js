import React, { Component } from 'react';
import Calculator from "./Calculator";
import {
  withStyles,
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiTypography: {
      
    }
  },
  palette: {
    primary: {
      main: "#488A99"
    },
    secondary: {
      main: "#FAAE3D"
    },
    background: {
      default: "#FFFFFF"
    }
  }
});
class App extends Component
 {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />                
        <Calculator />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(theme)(App);
