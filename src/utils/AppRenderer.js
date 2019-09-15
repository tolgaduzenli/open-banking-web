import React from 'react'
import { Router } from 'react-router-dom'
import { render as rtlRender } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'

export default function render(
    ui,
    {
        initialState = {},
        store = createStore(rootReducer, initialState),
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
        ...options
    } = {},
) {
    return {
        ...rtlRender(
            <Provider store={store}>
                <Router history={history}>{ui}</Router>
            </Provider>,
            options,
        ),
        history,
    }
}
