import React from 'react'
import { ReactDom } from 'react-dom'

import '../CSS/Modal.scss';

export default function Modal( {open, children, onClose} ) {
    if (!open) return null

    return (
        <div>
            <div className="overlay" />
            <div className='content-container'>
                <button className='bi bi-x-circle close-button' onClick={onClose}> </button>
                {children}
            </div>
        </div>
    )
}

//https://www.youtube.com/watch?v=LyLa7dU5tp8