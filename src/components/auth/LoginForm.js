import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextInputField from '../atoms/TextInputField'
import LoginButton from '../atoms/Button'

export default function LoginForm(props) {
    const { onSubmit, errors } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <form noValidate onSubmit={onSubmit}>
        <TextInputField
            name="email"
            value={email}
            onChange={setEmail}
            label="Email"
            error={errors.email || errors.emailnotfound} />
        <TextInputField
            name="password"
            value={password}
            onChange={setPassword}
            label="Password"
            error={errors.password} />
        <LoginButton type="submit" text="Log in" />
    </form>
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string)
}