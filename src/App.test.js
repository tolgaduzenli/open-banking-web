import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
import render from './utils/AppRenderer'

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
