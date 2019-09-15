/* eslint-disable max-len */
import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
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
    const { getByText, getByLabelText } = render(<Login />)
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/password/i)
    const loginButton = getByText(/login/i)
    fireEvent.change(email, { target: { name: 'email', value: 'email' } })
    fireEvent.change(password, { target: { name: 'password', value: 'password' } })
    fireEvent.click(loginButton)
    expect(mockLoginAPICall).toHaveBeenCalledTimes(1)
    expect(mockLoginAPICall).toHaveBeenCalledWith({ email: 'email', password: 'password' })
})
