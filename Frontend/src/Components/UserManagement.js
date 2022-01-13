import React, { useState } from 'react'

import '../CSS/UserManagement.scss'
import '../CSS/Home.scss';
import NavBar from './Navbar';
import UserTable from './UserTable';
import UserForm from './UserForm'
import Modal from './Modal'

export default function UserManagement() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="navBar-container">
                <NavBar />
            </div>
            <div className="centered-media">
                <h1 className="title">Utenti</h1>
                <button onClick={() => {setIsOpen(true); console.log("Aperto il Popup");}}>Aggiungi Nuovo Utente</button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <UserForm />
                </Modal>

                <UserTable />
            </div>
        </div>
    );
}
