import React from 'react'
// import { fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import render from '../utils/AppRenderer'
import Login from '../components/auth/Login'
import { loginUser as mockloginUser } from '../actions/authActions'

jest.mock('../actions/authActions', () => {
    return {
        loginUser: jest.fn(() => {
            Promise.resolve()
        }),
    }
})

afterEach(() => {
    mockloginUser.mockClear()
})

test('Renders components without crash', () => {
    const { getByText } = render(<Login />)
    getByText(/back to home/i)
    getByText(/don't have an account/i)
    getByText(/register/i)
    getByText(/email/i)
    getByText(/password/i)
    getByText(/login/i)
})

// test('Should send login credentials to the server', async () => {
//     const { getByText, getByLabelText } = render(<Login />)
//     const email = getByLabelText(/email/i)
//     const password = getByLabelText(/password/i)
//     const loginButton = getByText(/login/i)
//     fireEvent.change(email, { target: { name: "email", value: "email" } })
//     fireEvent.change(password, { target: { name: "password", value: "password" } })
//     fireEvent.click(loginButton)
//     expect(mockloginUser).toHaveBeenCalledWith({ email: "email", password: "password" })
//     expect(mockloginUser).toHaveBeenCalledTimes(1)
// })
