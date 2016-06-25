import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App.tsx';
import rootReducer from './main/reducer';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import Storage from './storage';

const storage = new Storage('tournament');
storage.fetch().then((data = {}) => {
    const store: Store = createStore(rootReducer, data);
    const history = syncHistoryWithStore(browserHistory, store);

    store.subscribe(() => {
        storage.save(store.getState());
    });

    ReactDOM.render(
        <Provider store={store}>
            <App history={history} />
        </Provider>,
        document.querySelector('main')
    );
});