import React from 'react'
import PropTypes from 'prop-types'

export default function CheckboxInputField(props) {
    const { onChange, name, value, checked, label, id } = props
    return (
        <div className="col s6">
            <p>
                <label htmlFor={id}>
                    <input
                        className="with-gap"
                        name={name}
                        id={id}
                        value={value}
                        type="radio"
                        checked={checked}
                        onChange={e => onChange(e.target.value)}
                    />
                    <span>{label}</span>
                </label>
            </p>
        </div>
    )
}

CheckboxInputField.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    checked: PropTypes.bool,
}
