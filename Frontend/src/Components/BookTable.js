import '../CSS/Table.scss';
import React, { Component } from 'react';
import FunctionButtons from './FunctionButtons';

export default class BookTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { keyword: null, data: [], isMouseInside: false };

        this.MouseEnter = this.MouseEnter.bind(this);
        this.MouseLeave = this.MouseLeave.bind(this);
    }

    componentDidUpdate()
    {
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
    }

    componentDidMount()
    {
        this.componentDidUpdate();
    }

    // These functions are used in order to show or hide <FunctionButtons /> (editing and deleting)
    MouseEnter(event) {  //check if user mouse is on table row
        this.setState({ isMouseInside: true });
    }

    MouseLeave(event) {  //check if user mouse is outside of table row
        this.setState({ isMouseInside: false });
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
                            <th>Azione</th>
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
                        <tr onMouseEnter={this.MouseEnter} onMouseLeave={this.MouseLeave}>
                                <td>xd</td>
                                <td>xdd</td>
                                <td>lol</td>
                                <td>lmao</td>
                                <td>fff</td>
                                <td className="functionButtons-cell">
                                    {this.state.isMouseInside ? <FunctionButtons/> : null}
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}