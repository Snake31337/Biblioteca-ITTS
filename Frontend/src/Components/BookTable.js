import '../CSS/BookTable.scss';
import React, { Component } from 'react';

export default class BookTable extends React.Component  {

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
        fetch('http://192.168.105.77:8080/', {
            method: 'POST',
            body: JSON.stringify({
                type: 'listBooks',
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

    //var libri = JSON.parse(testValues);
    //console.log(libri2);
    //console.log(libri);
    //console.log(libri[1,0]);
    
    render (){
        return(
        <div className="table-container">
            <table className="book-table">
                <thead>
                    <tr className='first-row'>
                        <th><i className="bi bi-file-earmark-font"></i>Titolo e ISBN</th>
                        <th><i className="bi bi-people-fill"></i>Autore/i</th>
                        <th><i className="bi bi-house"></i>Editore</th>
                        <th><i class="bi bi-calendar-event"></i>Anno</th>
                        <th><i class="bi bi-translate"></i>Lingua</th>
                    </tr>
                </thead>
                <tbody>
                    {//console.log(this.state.data[0].CodiceLibro)
                    console.log(this.state.data)
                    }

                    {
                        this.state.data.map((libro) => (
                            <tr>
                            <td>{libro.Titolo}</td>
                            <td>{libro.Nome} {libro.Cognome}</td>
                            <td>{libro.Editore}</td>
                            <td>{libro.AnnoPubblicazione}</td>
                            <td>{libro.Lingua}</td>
                        </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )}
}