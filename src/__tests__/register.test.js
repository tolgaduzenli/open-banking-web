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
    const { getAllByText, getByLabelText } = render(<Register />)
    getByLabelText(/name/i)
    getByLabelText(/email/i)
    getByLabelText(/password/i)
    getByLabelText(/officer/i)
    getByLabelText(/client/i)
    getAllByText(/register/i)
})

test('Should send register values to the server', async () => {
    const { getAllByText, getByLabelText } = render(<Register />)
    const name = getByLabelText(/name/i)
    const email = getByLabelText(/email/i)
    const password = getByLabelText(/password/i)
    const register = getAllByText(/register/i)[1]
    fireEvent.change(name, { target: { name: 'name', value: 'o1' } })
    fireEvent.change(email, { target: { name: 'email', value: 'o@o.com' } })
    fireEvent.change(password, { target: { name: 'password', value: '123456' } })
    fireEvent.click(register)
    expect(mockRegisterAPICall).toHaveBeenCalledTimes(1)
    expect(mockRegisterAPICall).toHaveBeenCalledWith({
        name: 'o1',
        role: 'OFFICER',
        email: 'o@o.com',
        password: '123456',
    })
})
