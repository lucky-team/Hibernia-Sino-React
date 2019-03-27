import React, { Component } from 'react';
import Main from './components/MainComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff7d47',
      main: '#e64a19',
      dark: '#ac0800',
      contrastText: '#fff',
    },
    secondary: {
      light: '#48a999',
      main: '#00796b',
      dark: '#004c40',
      contrastText: '#ffffff',
    },
  }
});

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
