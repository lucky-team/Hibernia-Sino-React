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
      light: '#ffa4a2',
      main: '#e57373',
      dark: '#af4448',
      contrastText: '#ffffff',
    },
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <div>
                <Main />
              </div>
            </BrowserRouter>
          </MuiThemeProvider>
       </Provider>
    );
  }
}

export default App;
