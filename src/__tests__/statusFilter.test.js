/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StatusFilter from '../components/common/StatusFilter'

jest.mock('react-select', () => ({ options, value, onChange }) => {
    function handleChange(event) {
        const option = options.find(item => {
            return item.value === event.target.value
        })
        onChange(option)
    }
    return (
        <select data-testid="select" value={value} onChange={handleChange}>
            {options.map(({ label, value }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    )
})

test('Renders component without crash', () => {
    const { getByText } = render(<StatusFilter onChangeFilter={jest.fn()} />)
    getByText(/filter by status/i)
    getByText(/all/i)
})

test('Change selected value', async () => {
    const onChangeFilter = jest.fn()
    const { getByTestId } = render(<StatusFilter onChangeFilter={onChangeFilter} />)
    fireEvent.change(getByTestId('select'), { target: { label: 'Approved', value: 'APPROVED' } })
    expect(onChangeFilter).toHaveBeenCalledTimes(1)
})
