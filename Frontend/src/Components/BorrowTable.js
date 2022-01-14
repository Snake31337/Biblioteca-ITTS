import React, { Component } from 'react';
import '../CSS/Table.scss';

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
        fetch('http://192.168.105.77:8080/', {
            method: 'POST',
            body: JSON.stringify({
          type: '',
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
        <div>{this.state.errorMessage}</div>
    </div>
    )};
    
}
