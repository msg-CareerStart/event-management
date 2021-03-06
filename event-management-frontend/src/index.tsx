import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux'
import { store } from './store/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./i18n";
import themeDark from './styles/Apptheme';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ThemeProvider theme={themeDark}>
                <App/>
            </ThemeProvider>
        </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
