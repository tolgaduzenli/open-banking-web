/* eslint-disable max-len */
import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import render from '../utils/AppRenderer'
import Login from '../components/auth/Login'
import { loginAPICall as mockLoginAPICall } from '../utils/APICall'

jest.mock('../utils/APICall', () => {
    return {
        loginAPICall: jest.fn(() => {
            return Promise.resolve({
                data: {
                    success: true,
                    token:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2Q2ZDRhMmE5ZjY5YTdmM2E0Y2EzYyIsIm5hbWUiOiJlMSIsInJvbGUiOiJDTElFTlQiLCJlbWFpbCI6ImUxQGUuY29tIiwiZW1waXJlSWQiOiJFU1NPUyIsImlhdCI6MTU2ODU4NzA2OCwiZXhwIjoxNjAwMTQzOTk0fQ.nPl6d0eqA92e2Tig4tKTumOpBG9kgP1gcaCJ4fC3jL0',
                },
            })
        }),
    }
})

afterEach(() => {
    mockLoginAPICall.mockClear()
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

test('Should send login credentials to the server', async () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] })
    const { getByText, getByLabelText } = render(<Login history={history} />)
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/password/i)
    const loginButton = getByText(/log in/i)

    fireEvent.change(email, { target: { name: 'email', value: 'e1@e.com' } })
    fireEvent.change(password, { target: { name: 'password', value: '123456' } })
    fireEvent.click(loginButton)
    expect(mockLoginAPICall).toHaveBeenCalledTimes(1)
    expect(mockLoginAPICall).toHaveBeenCalledWith({ email: 'e1@e.com', password: '123456' })
})

// test redirection to the dashboard after successfully login

// test incorrect credentials case
