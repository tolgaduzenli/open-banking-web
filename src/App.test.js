import React from 'react'
import { render as rtlRender, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './App'

function render(
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

// Test for Routing main application
test('Renders Main app with Landing page and Navigation Bar', () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId('landing-page')).toBeInTheDocument()
    expect(queryByTestId('nav-bar')).toBeInTheDocument()
    expect(queryByTestId('client-dashboard')).not.toBeInTheDocument()
    expect(queryByTestId('officer-dashboard')).not.toBeInTheDocument()
    expect(queryByTestId('login-page')).not.toBeInTheDocument()
    expect(queryByTestId('register-page')).not.toBeInTheDocument()
    expect(queryByTestId('user-profile')).not.toBeInTheDocument()
})

test('Renders register page', () => {
    const { getByText, queryByTestId } = render(<App />)
    // click Register link
    fireEvent.click(getByText('Register'))
    expect(queryByTestId('register-page')).toBeInTheDocument()
    expect(queryByTestId('nav-bar')).toBeInTheDocument()
    expect(queryByTestId('landing-page')).not.toBeInTheDocument()
    expect(queryByTestId('client-dashboard')).not.toBeInTheDocument()
    expect(queryByTestId('officer-dashboard')).not.toBeInTheDocument()
    expect(queryByTestId('login-page')).not.toBeInTheDocument()
    expect(queryByTestId('user-profile')).not.toBeInTheDocument()
})

test('Renders login page', () => {
    const { getByText, queryByTestId } = render(<App />)
    // click Login link
    fireEvent.click(getByText('Log in'))
    expect(queryByTestId('login-page')).toBeInTheDocument()
    expect(queryByTestId('nav-bar')).toBeInTheDocument()
    expect(queryByTestId('register-page')).not.toBeInTheDocument()
    expect(queryByTestId('landing-page')).not.toBeInTheDocument()
    expect(queryByTestId('client-dashboard')).not.toBeInTheDocument()
    expect(queryByTestId('officer-dashboard')).not.toBeInTheDocument()
    expect(queryByTestId('user-profile')).not.toBeInTheDocument()
})
