import React from 'react';
import "../CSS/Form.scss"

import {currentIP} from './IPAddress'

class BorrowForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {CodiceFiscale: '', CodiceLibro: '', DataInizioPrestito: '', DataFinePrestito: ''};     
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });  
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(JSON.stringify(this.state));

        fetch(currentIP, {
            method: "POST",
            
            body: JSON.stringify({
                type: 'insertBorrow',
                borrowArgs: this.state,
            })
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({ data : responseJson })
        })
        .then((response) => {console.log(response.json())})
        .catch((error) => {
          console.error(error);
        });
    }
    

    render(){
        return (
<div>
                <div className='title'>
                Aggiungi un prestito
                </div>
                <div className="form-container">
                    <form className='fields-container' onSubmit={this.handleSubmit}>
                    <label>
                        Utente:
                        <input name="CodiceFiscale" type="text" value={this.state.CodiceFiscale} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Libro: 
                        <input name="CodiceLibro" type="text" value={this.state.CodiceLibro} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Data Prestito:
                        <input name="DataInizioPrestito" type="date" value={this.state.DataInizioPrestito} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Data Scadenza:
                        <input name="DataFinePrestito" type="date" value={this.state.DataFinePrestito} onChange={this.handleInputChange}></input>
                    </label>

                    <input className='submitButton' type='submit'/>
                    </form>
                </div>
            </div>
        );
    }
}

export default BorrowForm;







//easter egg by berna