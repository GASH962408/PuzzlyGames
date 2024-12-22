import React from 'react'
import './header.css'

const header = () => {
    return (
        <div className='header'>
                    <ul>
                        <li><a href="#home">Inicio</a></li>
                        <li><a href="#login">Log In</a></li>
                        <li><a href="#signin">Sign In</a></li>
                    </ul>
        </div>
    )
}

export default header