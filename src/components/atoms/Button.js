import React from 'react'
import PropTypes from 'prop-types'

export default function Button(props) {
    const { text, onClick, styleName } = props

    const defaultStyle = 'btn btn-large waves-effect waves-light hoverable blue accent-3'

    return (
        <div className="col s12">
            <button
                style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                }}
                type="submit"
                className={styleName || defaultStyle}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

Button.propTypes = {
    styleName: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}
