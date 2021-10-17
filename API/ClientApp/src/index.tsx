import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import App from './app/layout/App';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter, Router } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css'
import '../src/app/layout/Styles.css'
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.min.css'

export const history = createBrowserHistory();


ReactDOM.render(
    <StoreContext.Provider value={store}>
        <BrowserRouter>
            <Router history={history}>
                <App />
            </Router>
        </BrowserRouter>
    </StoreContext.Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
