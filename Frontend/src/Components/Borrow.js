import React, { useState } from 'react'

import BorrowTable from './BorrowTable';
import Modal from './Modal'
import BorrowForm from './BorrowForm';

import '../CSS/UserManagement.scss'
import '../CSS/Home.scss';
import '../CSS/Button.scss'

export default function Borrow() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="grid-item main">
                <div className='main-wrapper'>
                        <h1 className="title">Prestiti</h1>
                        <button className='button rounded' onClick={() => {setIsOpen(true); console.log("Aperto il Popup");}}>
                            <div className="label">Aggiungi Prestito</div>
                            <i class="bi bi-plus-circle icon"></i>
                        </button>
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <BorrowForm />
                        </Modal>
        
                        <BorrowTable className="main-item" />
                    </div>
                </div>
            </div>
    );
}
