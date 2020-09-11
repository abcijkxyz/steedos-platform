// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// This is a temporary store while we are transitioning from Flux to Redux. This file exports
// the configured Redux store for use by actions and selectors.

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';
import initialState from './initial_state';
import { ContactSupportOutlined } from '@material-ui/icons';

const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(
      thunkMiddleware,
    )
);

export function bindActionToRedux(action, ...args) {
    return async () => {
        await action(...args)(store.dispatch, store.getState);
    };
}

if (process.env.NODE_ENV !== 'production') { //eslint-disable-line no-process-env
    window.store = store;
}

export default store;