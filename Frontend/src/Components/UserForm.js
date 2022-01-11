import React, {Component} from 'react';

class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {cFiscale: '', nome: '', cognome: '', rTessera: '',};
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //handleChange(event) {
    //    this.setState({value: event.target.value});  
    //}

    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.cFiscale);
        
    }
    

    render(){
        return (
            <div>
                <div>
                Aggiungi un utente
                </div>
                <div className="form-container">
                    <form>
                    <label>
                        Codice Fiscale:
                        <input name='cFiscale' type="text"></input>
                    </label>
                    <label>
                        Nome:
                        <input name='nome' type="text"></input>
                    </label>
                    <label>
                        Cognome:
                        <input name='cognome' type="text"></input>
                    </label>
                    <label>
                        Registrazione Tessera:
                        <input name='rTessera' type="date"></input>
                    </label>
                    <label>
                        Indirizzo:
                        <input name='indirizzo' type="text"></input>
                    </label>
                    <label>
                        Numero Tessera:
                        <input name='nTessera' type="number"></input>
                    </label>
                    <input type='submit' />
                    </form>
                </div>
            </div>
        );
    }
}

export default UserForm;