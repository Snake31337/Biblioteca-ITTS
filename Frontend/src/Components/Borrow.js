import React, { useState } from 'react'

import BorrowTable from './BorrowTable';
import Modal from './Modal'
import BorrowForm from './BorrowForm';
import SearchBar from './SearchBar';

import {currentIP} from './IPAddress';

import '../CSS/UserManagement.scss'
import '../CSS/Home.scss';
import '../CSS/Button.scss'

export default class Borrow extends React.Component {
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
                    type: 'listBorrows',
                    orderBy: 'DataInizioPrestito',
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
                    type: 'searchBorrow',
                    orderBy: 'DataInizioPrestito',
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
                            <h1 className="title">Prestiti</h1>

                            <div className="main-item searchBar-container">
                                <SearchBar updateKeyword={this.updateKeyword} label="Quale prestito stai cercando?"/>
                            </div>

                            <button className='button rounded' onClick={() => {this.setState({open: true}); console.log("Aperto il Popup");}}>
                                <div className="label">Aggiungi Prestito</div>
                                <i class="bi bi-plus-circle icon"></i>
                            </button>
                            <Modal open={this.state.open} onClose={() => this.setState({open: false})}>
                                <BorrowForm />
                            </Modal>
            
                            <BorrowTable fetchRemoteData={this.fetchRemoteData} data={this.state.databaseData} className="main-item" />
                    </div>
                </div>
            </div>
            
        );
    }
}
