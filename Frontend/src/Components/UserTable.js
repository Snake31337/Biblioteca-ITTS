import React, { Component } from 'react';
import '../CSS/Table.scss';
import FunctionButtons from './FunctionButtons';
import 'semantic-ui-css/semantic.min.css'   
import { Loader } from 'semantic-ui-react'

import {currentIP} from './IPAddress'

export default class UserTable extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
          data : [],
          isMouseInside: [false, '']
        };
        this.removeRow = this.removeRow.bind(this);
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

    removeRow(bookKey) {    // Questa funzione viene chiamata quando viene premuto il pulsante cancella riga in Functionbuttons

        //this.setState({ showRow: [true, bookKey] });

        this.props.fetchRemoteData();
    }

    render(){
        if(this.props.data == null)
        {
            return (
                <div className="table-container">
                    <table className="book-table">
                        <br></br>
                            <Loader active indeterminate inline='centered'>Fetching data</Loader>
                        <br></br>
                    </table>
                </div>
            )
        }
        else if(Array.isArray(this.props.data) && this.props.data.length > 0)
        {
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
                        this.props.data.map((studente) => (
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
            )
        }
        else
        {
            return (
                <div className="table-container">
                    <table className="book-table">
                        <thead>
                            <tr className='first-row'>
                                <th><i className="bi bi-file-earmark-font"></i>Titolo e ISBN</th>
                                <th><i className="bi bi-people-fill"></i>Autore/i</th>
                                <th><i className="bi bi-house"></i>Editore</th>
                                <th><i className="bi bi-calendar-event"></i>Anno</th>
                                <th><i className="bi bi-translate"></i>Lingua</th>
                                <th className="functionButtons-column">Azione</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No data</td>
                                <td>No data</td>
                                <td>No data</td>
                                <td>No data</td>
                                <td>No data</td>
                                <td>No actions</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}
