import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeLink() {
    return (
        <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to home
    </Link>
    )
}
