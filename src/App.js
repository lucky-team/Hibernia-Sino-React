import React, { Component } from 'react';
import Main from './components/MainComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

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
      <Provider store={store}>
        <div>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </MuiThemeProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
