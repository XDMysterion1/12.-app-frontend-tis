import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter, Switch ,Route} from 'react-router-dom'
import ScrollToTop                  from './ScrollToTop';
import { LoginApp }                 from './components/LoginApp';
import { Register }                 from './components/Register';


ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/Login"    exact={true} render={props => <LoginApp layoutColorMode={'light'} {...props} />} />
            <Route path="/Register" exact={true} render={props => <Register layoutColorMode={'light'} {...props} />} />
            <ScrollToTop>
                <App></App>
            </ScrollToTop>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();