import React, { useState } from 'react'

import BookTable from './BookTable';
import BookForm from './BookForm'
import Modal from './Modal'
import SearchBar from './SearchBar';

import {currentIP} from './IPAddress'

import '../CSS/UserManagement.scss';
import '../CSS/Home.scss';
import '../CSS/Button.scss';
import '../CSS/BookManagement.scss';

export default class BookManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          databaseData: null
        };

        this.fetchRemoteData = this.fetchRemoteData.bind(this);
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
                    type: 'listBooks',
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
                    type: 'searchBook',
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

    render(){
    return (
        <div>
            <div className="grid-item main">
                <div className='main-wrapper'>
                        <h1 className="title">Libri</h1>

                        <Modal open={this.state.open} onClose={() => this.setState({open: false})}>
                            <BookForm />
                        </Modal>
        
                        <div className="main-item searchBar-container">
                                <SearchBar updateKeyword={this.updateKeyword} />
                        </div>

                        <button className='button rounded' onClick={() => {this.setState({open: true}); console.log("Aperto il Popup");}}>
                            <div className="label">Aggiungi Libro</div>
                            <i class="bi bi-plus-circle icon"></i>
                        </button>
                          
                        <div className="main-item bookTable-container">
                                <BookTable data={this.state.databaseData} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
