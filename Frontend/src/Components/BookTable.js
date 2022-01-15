import '../CSS/Table.scss'; 
import React from 'react';
import FunctionButtons from './FunctionButtons';


export default class BookTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { isMouseInside: [false, ''] };

        this.MouseEnter = this.MouseEnter.bind(this);
        this.MouseLeave = this.MouseLeave.bind(this);
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

    render()
    {
        if(Array.isArray(this.props.data) && this.props.data.length > 0)
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
                                this.props.data.map((decodedData) => (
                                    <tr key={decodedData.CodiceLibro} onMouseEnter={this.MouseEnter} onMouseLeave={this.MouseLeave}>
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