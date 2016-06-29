import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App.tsx';
import rootReducer from './main/reducer';
import { Provider } from 'react-redux';
import { Store, createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const store: Store = createStore(rootReducer, {}, applyMiddleware(routerMiddleware(browserHistory)));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.querySelector('main')
);
