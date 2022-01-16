import React, { useState } from 'react'

import UserTable from './UserTable';
import UserForm from './UserForm'
import Modal from './Modal'
import SearchBar from './SearchBar';

import {currentIP} from './IPAddress'

import '../CSS/UserManagement.scss'
import '../CSS/Home.scss';
import '../CSS/Button.scss'

export default class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          databaseData: null
        };

        this.fetchRemoteData = this.fetchRemoteData.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this);
    }

    fetchRemoteData(searchKey)
    {
        this.setState({ databaseData: null });

        if(searchKey == null)
        {
            fetch(currentIP,
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: 'listUsers',
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ databaseData: responseJson});
            })
            .then((response) => {
                console.log(response.json())
            })
            .catch((error) => {
                console.error(error);
            });

        }
        else
        {
            fetch(currentIP,
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: 'searchUser',
                    keyword: searchKey,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ databaseData: responseJson});
            })
            .then((response) => {
                console.log(response.json())
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
    }

    updateKeyword = (keyword) =>
    {
        this.fetchRemoteData(keyword);
    }

    componentDidMount()
    {
        this.fetchRemoteData();
    }

    // Al submit del form si chiude la finestra popup
    handleOpenChange() {
        this.setState({open: false});
        this.fetchRemoteData();
    }

    render(){
        return (
            <div>
                <div className="grid-item main">
                    <div className='main-wrapper'>
                            <h1 className="title">Utenti</h1>
                        
                            <div className="main-item searchBar-container">
                                <SearchBar updateKeyword={this.updateKeyword} label="Quale utente stai cercando?"/>
                            </div>

                            <button className='button rounded' onClick={() => {this.setState({open: true}); console.log("Aperto il Popup");}}>
                                <div className="label">Aggiungi Utente</div>
                                <i class="bi bi-plus-circle icon"></i>
                            </button>
                            
                            <Modal open={this.state.open} onClose={() => this.setState({open: false})}>
                                <UserForm />
                            </Modal>
            
                            <UserTable className="main-item" data={this.state.databaseData} />
                        </div>
                    </div>
                </div>
        );
    }
}
