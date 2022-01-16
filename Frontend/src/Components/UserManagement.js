import React, { useState } from 'react'

import NavBar from './Navbar';
import UserTable from './UserTable';
import UserForm from './UserForm'
import Modal from './Modal'
import SideNavBar from './SideNavBar';

import '../CSS/UserManagement.scss'
import '../CSS/Home.scss';
import '../CSS/Button.scss'

export default function UserManagement() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="grid-item main">
                <div className='main-wrapper'>
                        <h1 className="title">Utenti</h1>
                        <button className='button rounded' onClick={() => {setIsOpen(true); console.log("Aperto il Popup");}}>
                            <div className="label">Aggiungi Utente</div>
                            <i class="bi bi-plus-circle icon"></i>
                        </button>
                        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                            <UserForm />
                        </Modal>
        
                        <UserTable className="main-item" />
                    </div>
                </div>
            </div>
    );
}
