import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EmpireSelector from 'react-select'
import TextInputField from '../atoms/TextInputField'
import CheckboxInputField from '../atoms/CheckboxInputField'
import RegisterButton from '../atoms/Button'

const empireOptions = [{ label: 'ESSOS', value: 'ESSOS' }, { label: 'WESTEROS', value: 'WESTEROS' }]

export default function RegisterForm(props) {
    const { onSubmit, errors } = props

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('OFFICER')
    const [empireId, setEmpireId] = useState('')

    return (
        <form noValidate onSubmit={onSubmit}>
            <div className="row">
                <TextInputField
                    name="name"
                    value={name}
                    onChange={setName}
                    label="Name"
                    error={errors.name}
                />
                <TextInputField
                    name="email"
                    value={email}
                    onChange={setEmail}
                    label="Email"
                    error={errors.email}
                />
            </div>
            <div className="row">
                <TextInputField
                    name="password"
                    value={password}
                    onChange={setPassword}
                    label="Password"
                    error={errors.password}
                />
                <div className="col s6">
                    <div className="row">
                        <span>Select your role</span>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <CheckboxInputField
                                name="role"
                                id="officer-input"
                                label="Officer"
                                value="OFFICER"
                                checked={role === 'OFFICER'}
                                onChange={setRole}
                            />
                            <CheckboxInputField
                                name="role"
                                id="client-input"
                                label="Client"
                                value="CLIENT"
                                checked={role === 'CLIENT'}
                                onChange={setRole}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {role && role !== null && role === 'CLIENT' && (
                    <div className="col s6 offset-s6">
                        <EmpireSelector
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Select your empire"
                            name="empireId"
                            value={empireId}
                            options={empireOptions}
                            onChange={e => setEmpireId(e)}
                        />
                    </div>
                )}
            </div>
            <RegisterButton type="submit" text="Register" />
        </form>
    )
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
    errors: PropTypes.objectOf(PropTypes.string),
}
