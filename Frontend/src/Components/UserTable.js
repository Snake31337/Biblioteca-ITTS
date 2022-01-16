import React, { Component } from 'react';
import '../CSS/Table.scss';
import FunctionButtons from './FunctionButtons';

import {currentIP} from './IPAddress'

export default class UserTable extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
          data : [],
          isMouseInside: [false, '']
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
    
    // These functions are used in order to show or hide <FunctionButtons /> (editing and deleting)
    MouseEnter(event, key) {  //check if user mouse is on table row
        event.preventDefault();
        this.setState({ isMouseInside: [true, key] });
    }

    MouseLeave(event) {  //check if user mouse is outside of table row
        event.preventDefault();
        this.setState({ isMouseInside: [false, ''] });
    }

    CheckMouseState(key) {
        if(this.state.isMouseInside[0] && this.state.isMouseInside[1] === key) {
            return true;
        } else {
            return false;
        }
    }

    render(){
    return(
    <div className="table-container">
        <table className="book-table">
            <thead>
                <tr className='first-row'>
                    <th><i className="bi bi-file-earmark-font"></i>C. Fiscale</th>
                    <th><i className="bi bi-people-fill"></i>Nome</th>
                    <th>Cognome</th>
                    <th><i class="bi bi-calendar-event"></i>Registrazione Tessera</th>
                    <th><i class="bi bi-globe"></i>Indirizzo</th>
                    <th><i class="bi bi-globe"></i>Numero Tessera</th>
                    <th className="functionButtons-column"></th>
                </tr>
            </thead>
            <tbody>
            {
                this.state.data.map((studente) => (
                            <tr key={studente.CodiceFiscale} onMouseEnter={(e) => this.MouseEnter(e, studente.CodiceFiscale)} onMouseLeave={(e) => this.MouseLeave(e)}>
                            <td>{studente.CodiceFiscale}</td>
                            <td>{studente.Nome} </td>
                            <td>{studente.Cognome}</td>
                            <td>{studente.DataRegistrazioneTessera}</td>
                            <td>{studente.Indirizzo}</td>
                            <td>{studente.NumeroTessera}</td>
                            <td className="functionButtons-cell">
                                <FunctionButtons formType="userForm" removeRow={this.removeRow} relativeTo={studente.CodiceFiscale} hidden={this.CheckMouseState(studente.CodiceFiscale) ? false : true} />
                            </td>
                        </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    )};
    
}
