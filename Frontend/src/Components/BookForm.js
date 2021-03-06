import React from 'react';
import {currentIP} from './IPAddress'
import "../CSS/Form.scss"

export default class BookForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {Titolo: '', Autore: '', Lingua: '', Editore: '', AnnoPubblicazione: '', Categoria: '', ISBN: ''};     
        
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

    if(this.props.requestType === "update"){
        console.log("Updating")
        fetch(currentIP, {
            method: "POST",
            
            body: JSON.stringify({
                type: 'updateBook',
                id: this.props.elementID,
                bookArgs: this.state,
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
    else
    {
        console.log("Fetching")
        fetch(currentIP, {
            method: "POST",
            
            body: JSON.stringify({
                type: 'insertBook',
                bookArgs: this.state,
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
        
        //this.props.handleOpenChange(); // quando si fa submit fa il backcall della funzione in BookManagement
    }
    
    render(){
        if(this.props.requestType === "update"){
            var title = "Modifica libro"
        }else{
            var title = "Aggiungi un libro"
        }
        return (
            <div>
                <div className='title'>{title}</div>
                    <div className="form-container">
                        <form className='fields-container' onSubmit={this.handleSubmit}>
                        <label>
                            Titolo: 
                            <input name="Titolo" type="text" value={this.state.Titolo} onChange={this.handleInputChange}></input>
                        </label>
                        <label>
                            Autore: 
                            <input name="Autore" type="text" value={this.state.Autore} onChange={this.handleInputChange}></input>
                        </label>
                        <label>
                            Lingua: 
                            <input name="Lingua" type="text" value={this.state.Lingua} onChange={this.handleInputChange}></input>
                        </label>
                        <label>
                            Editore:
                            <input name="Editore" type="text" value={this.state.Editore} onChange={this.handleInputChange}></input>
                        </label>
                        <label>
                            Anno Pubblicazione:
                            <input name="AnnoPubblicazione" type="number" value={this.state.AnnoPubblicazione} onChange={this.handleInputChange}></input>
                        </label>
                        <label>
                        Categoria:
                            <input name="Categoria" type="select" value={this.state.Categoria} onChange={this.handleInputChange}></input>
                        </label>
                        <label>
                            ISBN:
                            <input name="ISBN" type="number" value={this.state.ISBN} onChange={this.handleInputChange}></input>
                        </label>
                        <input className='submitButton' type='submit'/>
                        </form>
                    </div>
                </div>
            );
        
    }
}








//easter egg by berna