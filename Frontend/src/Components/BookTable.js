import '../CSS/Table.scss';
import React from 'react';
import FunctionButtons from './FunctionButtons';
import { Loader } from 'semantic-ui-react'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default class BookTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { keyword: null, data: [], isMouseInside: false };

        this.MouseEnter = this.MouseEnter.bind(this);
        this.MouseLeave = this.MouseLeave.bind(this);
    }

    fetchRemoteData()
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

    componentDidUpdate()
    {
        //this.fetchRemoteData();
    }

    componentDidMount()
    {
        this.fetchRemoteData();
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
        if(this.state.data == null || this.state.data.length == 0)
        {
            return (
                <div className="table-container">
                    <div className="book-table">
                        <br></br>
                            <Loader active indeterminate inline='centered'>Fetching data</Loader>
                        <br></br>
                    </div>
                </div>
            );
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
                                <th>Azione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((decodedData) => (
                                    <tr onMouseEnter={this.MouseEnter} onMouseLeave={this.MouseLeave}>
                                        <td hidden>{decodedData.CodiceLibro}</td>
                                        <td>{decodedData.Titolo}</td>
                                        <td>{decodedData.Nome} {decodedData.Cognome}</td>
                                        <td>{decodedData.Editore}</td>
                                        <td>{decodedData.AnnoPubblicazione}</td>
                                        <td>{decodedData.Lingua}</td>
                                        <td className="functionButtons-cell">
                                            {this.state.isMouseInside ? <FunctionButtons/> : null}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}