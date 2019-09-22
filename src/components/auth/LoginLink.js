import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginLink() {
    return (
        <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
                <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    )
}
