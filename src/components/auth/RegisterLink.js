import React from 'react'
import { Link } from 'react-router-dom'


export default function RegisterLink() {
    return (
        <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
                <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
                Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    )
}