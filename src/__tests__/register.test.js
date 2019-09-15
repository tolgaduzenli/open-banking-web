import React from 'react'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import render from '../utils/AppRenderer'
import Register from '../components/auth/Register'
import { registerAPICall as mockRegisterAPICall } from '../utils/APICall'

jest.mock('../utils/APICall', () => {
    return {
        registerAPICall: jest.fn(() => {
            return Promise.resolve({})
        }),
    }
})

afterEach(() => {
    mockRegisterAPICall.mockClear()
})

test('Renders components without crash', () => {
    const { getByText, getByLabelText } = render(<Register />)
    getByLabelText(/name/i)
    getByLabelText(/email/i)
    getByLabelText(/password/i)
    getByLabelText(/officer/i)
    getByLabelText(/client/i)
    getByText(/sign up/i)
})

test('Should send register values to the server', async () => {
    const { getByText, getByLabelText } = render(<Register />)
    const email = getByLabelText(/name/i)
    const name = getByLabelText(/email/i)
    const password = getByLabelText(/password/i)
    const signup = getByText(/sign up/i)
    fireEvent.change(name, { target: { name: 'name', value: 'name' } })
    fireEvent.change(email, { target: { name: 'email', value: 'email' } })
    fireEvent.change(password, { target: { name: 'password', value: 'password' } })
    fireEvent.click(signup)
    expect(mockRegisterAPICall).toHaveBeenCalledTimes(1)
    expect(mockRegisterAPICall).toHaveBeenCalledWith({
        name: 'name',
        role: 'OFFICER',
        email: 'email',
        password: 'password',
    })
})
