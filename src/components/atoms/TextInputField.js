import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export default function TextInputField(props) {
    const { onChange, value, error, name, label, type } = props
    return <div className="input-field col s6">
        <input
            onChange={e => onChange(e.target.value)}
            value={value}
            error={error}
            id={name}
            name={name}
            type={type || "text"}
            className={classnames('', { invalid: error, })}
        />
        {label && label !== null && <label htmlFor={name} className="active">{label}</label>}
        {error && error !== null && <span className="red-text">{error}</span>}
    </div>
}

TextInputField.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string
}