import React from 'react'
// import { fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import render from '../utils/AppRenderer'
import Register from '../components/auth/Register'

test('Renders components without crash', () => {
    const { getByText, getByLabelText } = render(<Register />)
    getByLabelText(/name/i)
    getByLabelText(/email/i)
    getByLabelText(/password/i)
    getByLabelText(/officer/i)
    getByLabelText(/client/i)
    getByText(/sign up/i)
})
