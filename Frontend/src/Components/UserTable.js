import React, { Component } from 'react';
import '../CSS/Table.scss';

import {currentIP} from './IPAddress'

export default class UserTable extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
          data : []
        };
    }

    componentWillMount() {
        this.renderMyData();
    }

    renderMyData(){
        fetch(currentIP, {
            method: 'POST',
            body: JSON.stringify({
          type: 'listUsers',
        })
        })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ data : responseJson })
            })
            .then((response) => {console.log(response.json())})
            .catch((error) => {
              console.error(error);
            });
    }

    render(){
    return(
    <div className="table-container">
        <table className="book-table">
            <thead>
                <tr className='first-row'>
                    <th><i className="bi bi-file-earmark-font"></i>C. Fiscale</th>
                    <th><i className="bi bi-people-fill"></i>Nome/i</th>
                    <th>Cognome</th>
                    <th><i class="bi bi-calendar-event"></i>Registrazione Tessera</th>
                    <th><i class="bi bi-globe"></i>Indirizzo</th>
                    <th><i class="bi bi-globe"></i>Numero Tessera</th>
                </tr>
            </thead>
            <tbody>
            {
                this.state.data.map((studente) => (
                            <tr>
                            <td>{studente.CodiceFiscale}</td>
                            <td>{studente.Nome} </td>
                            <td>{studente.Cognome}</td>
                            <td>{studente.DataRegistrazioneTessera}</td>
                            <td>{studente.Indirizzo}</td>
                            <td>{studente.NumeroTessera}</td>
                        </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    )};
    
}
