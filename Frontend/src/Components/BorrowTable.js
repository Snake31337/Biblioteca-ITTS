import React, { Component } from 'react';
import '../CSS/Table.scss';

import {currentIP} from './IPAddress'

export default class BorrowTable extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
          data : [],
          errorMessage: ''
        };
    }

    componentWillMount() {
        this.renderMyData();
    }


    renderMyData(){
        fetch(currentIP, {
            method: 'POST',
            body: JSON.stringify({
            //Il type è da sostituire    
            type: 'listBooks',
        })
        })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ data : responseJson })
            })
            .then((response) => {console.log(response.json())})
            .catch((error) => {
                this.setState({errorMessage: error.message})
            });
    }   

    render(){
    return(
    <div className="table-container">
        <table className="book-table">
            <thead>
                <tr className='first-row'>
                    <th><i className="bi bi-file-earmark-font"></i>ID Prestito</th>
                    <th><i className="bi bi-people-fill"></i>Utente/i</th>
                    <th>Libro</th>
                    <th><i class="bi bi-calendar-event"></i>Data Prestito</th>
                    <th><i class="bi bi-globe"></i>Data Scadenza</th>
                    
                </tr>
            </thead>
            <tbody>
            {
                this.state.data.map((borrow) => (
                        <tr>

                        </tr>
                    )
                )
            }
            </tbody>
        </table>
        <div>{this.state.errorMessage}</div>
    </div>
    )};
    
}
