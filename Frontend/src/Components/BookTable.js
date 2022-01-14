import '../CSS/BookTable.scss';
import React, { Component } from 'react';

export default class BookTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { keyword: null, data: [] };
    }

    componentDidUpdate()
    {
        console.log("crepo");
        if(this.props.keyword == null)
        {
            fetch('http://localhost:8080/',
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: 'listBooks',
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data : responseJson })
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
            console.log("entro");
            fetch('http://localhost:8080/',
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: 'searchBook',
                    keyword: this.props.keyword,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data : responseJson })
            })
            .then((response) => {
                console.log(response.json())
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
        console.log(this.state.data);
    }

    componentDidMount()
    {
        this.componentDidUpdate();
    }
    
    render()
    {
        return (
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
                        {
                            this.state.data.map((decodedData) => (
                                <tr>
                                <td hidden>{decodedData.CodiceLibro}</td>
                                <td>{decodedData.Titolo}</td>
                                <td>{decodedData.Nome} {decodedData.Cognome}</td>
                                <td>{decodedData.Editore}</td>
                                <td>{decodedData.AnnoPubblicazione}</td>
                                <td>{decodedData.Lingua}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}