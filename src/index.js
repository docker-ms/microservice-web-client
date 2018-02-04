import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import './apps/global.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import reducers from './apps/gate/reducers';
import rootSaga from './apps/gate/sagas';

import SignIn  from './apps/gate/containers/SignIn';
import MainScreen from './apps/gate/containers/MainScreen';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainScreen} />
            <Route path="/SignIn" component={SignIn} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>,

    document.getElementById('root')
  );
};

render()


