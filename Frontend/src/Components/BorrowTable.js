import React, { Component } from 'react';
import '../CSS/Table.scss';
import FunctionButtons from './FunctionButtons';
import 'semantic-ui-css/semantic.min.css'   
import { Loader } from 'semantic-ui-react'


import {currentIP} from './IPAddress'

export default class BorrowTable extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
          data : [],
          errorMessage: ''
        };

        this.MouseEnter = this.MouseEnter.bind(this);
        this.MouseLeave = this.MouseLeave.bind(this);
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
        console.log("removeRow function in booktable");

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
        }else if(Array.isArray(this.props.data) && this.props.data.length > 0)
        {

        
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
                    <th><i class="bi bi-exclamation-triangle"></i>Scaduto</th>
                    
                </tr>
            </thead>
            <tbody>
            {
                this.props.data.map((decodedData) => (
                    
                    <tr key={decodedData.CodicePrestito}>
                        <td>{decodedData.CodicePrestito}</td>
                        <td>{decodedData.Nome + " " + decodedData.Cognome}</td>
                        <td>{decodedData.Titolo}</td>
                        <td>{decodedData.DataInizioPrestito}</td>
                        <td>{decodedData.DataFinePrestito}</td>
                    
                    <td>
                        {new Date() > new Date(decodedData.DataFinePrestito)
                        ? (<i class="bi bi-exclamation">Scaduto</i>)
                        : (null)
                        
                        }
                        {/* <FunctionButtons removeRow={this.removeRow} relativeTo={decodedData.CodiceLibro} hidden={this.CheckMouseState(decodedData.CodiceLibro) ? false : true} /> */}
                        </td>
                    </tr>
                    )
                )
            }
            
            </tbody>
        </table>
        <div>{this.state.errorMessage}</div>
    </div>
    )
    }else
    {
        return (
            <div className="table-container">
                <table className="book-table">
                    <thead>
                    <tr className='first-row'>
                        <th><i className="bi bi-file-earmark-font"></i>ID Prestito</th>
                        <th><i className="bi bi-people-fill"></i>Utente/i</th>
                        <th>Libro</th>
                        <th><i class="bi bi-calendar-event"></i>Data Prestito</th>
                        <th><i class="bi bi-globe"></i>Data Scadenza</th>
                        <th><i class="bi bi-exclamation-triangle"></i>Scaduto</th>    
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>No data</td>
                            <td>No data</td>
                            <td>No data</td>
                            <td>No data</td>
                            <td>No data</td>
                            <td>No data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    }
}
