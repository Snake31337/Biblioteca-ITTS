import React from 'react';
import "../CSS/Form.scss"

import {currentIP} from './IPAddress'

class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {CodiceFiscale: '', Nome: '', Cognome: '', DataRegistrazioneTessera: '', Indirizzo: '', NumeroTessera: ''};     
        
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
                type: 'insertUser',
                userArgs: this.state,
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
                Aggiungi un utente
                </div>
                <div className="form-container">
                    <form className='fields-container' onSubmit={this.handleSubmit}>
                    <label>
                        Codice Fiscale: 
                        <input name="CodiceFiscale" type="text" value={this.state.CodiceFiscale} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Nome: 
                        <input name="Nome" type="text" value={this.state.Nome} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Cognome:
                        <input name="Cognome" type="text" value={this.state.Cognome} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Registrazione Tessera:
                        <input name="DataRegistrazioneTessera" type="date" value={this.state.DataRegistrazioneTessera} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Indirizzo:
                        <input name="Indirizzo" type="text" value={this.state.Indirizzo} onChange={this.handleInputChange}></input>
                    </label>
                    <label>
                        Numero Tessera:
                        <input name="NumeroTessera" type="number" value={this.state.NumeroTessera} onChange={this.handleInputChange}></input>
                    </label>
                    <input className='submitButton' type='submit'/>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserForm;







//easter egg by berna