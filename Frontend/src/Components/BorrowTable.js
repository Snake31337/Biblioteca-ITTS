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


    componentWillMount() {
        this.renderMyData();
    }


    renderMyData(){
        fetch(currentIP, {
            method: 'POST',
            body: JSON.stringify({
            //Il type è da sostituire    
            type: 'listBorrows',
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
                    <th><i class="bi bi-exclamation-triangle"></i>Scaduto</th>
                    
                </tr>
            </thead>
            <tbody>
            {
                this.state.data.map((decodedData) => (
                    
                    <tr key={decodedData.Prestito}>
                    <td>{decodedData.CodiceLibro}</td>
                    <td>{decodedData.CodiceFiscale}</td>
                    <td>{decodedData.DataInizioPrestito}</td>
                    <td>{decodedData.DataFinePrestito}</td>
                    <td></td>
                    <td className="functionButtons-cell">
                        {new Date().toJSON().slice(0,10).replace(/-/g,'/') > decodedData.DataFinePrestito
                        ? (<i class="bi bi-exclamation"></i>)
                        : null
                        
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
    )};
    
}
