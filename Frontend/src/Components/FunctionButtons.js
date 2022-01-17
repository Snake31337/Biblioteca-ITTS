import '../CSS/FunctionButtons.scss'; 
import React from 'react';

import {currentIP} from './IPAddress'
import BookForm from './BookForm';

import Modal from './Modal';
import UserForm from './UserForm';

// Bottoni per l'Editing e cancellazione
export default class FunctionButtons extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { bookKey: this.props.relativeTo, open: false }

        this.showForm = this.showForm.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
    }

    showForm()
    { // show editing form
        alert("xd");
    }

    deleteElement(id)
    {
        console.log(this.props.relativeTo);
        let text = "Sei sicuro di voler cancellare questo elemento?";
        if(window.confirm(text) === true)
        {
            var methodType;
            if(this.props.formType === "bookForm"){
                methodType = "deleteBook";
            } else if (this.props.formType === "userForm") {
                methodType = "deleteUser";
            }

            fetch(currentIP,
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: methodType,
                    id: this.props.relativeTo,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .then((response) => {
                console.log(response.json())
            })
            .catch((error) => {
                console.error(error);
            });

            this.props.removeRow(this.props.relativeTo); // Questo comando chiama la funzione removeRow del Booktable.js. Serve per ri-renderizzare la tabella e togliere quindi la riga eliminata

            //Inserire richiesta di delete qui dentro
        }
        else
        {

        }
    }

    RenderForm() {
        console.log(this.props.formType);
        switch(this.props.formType) {
            case 'bookForm':
                return <BookForm requestType="update" elementID={this.state.bookKey}/>;
            case 'userForm':
                return <UserForm requestType="update" elementID={this.state.bookKey}/>;
            default:
                return null;
        }
    }
    
    render()
    {
        if(!this.props.hidden)
        {
            return (
                <div className="FunctionButtons">
                        <button type="button" className="functionButtons-button" onClick={() => {this.setState({open: true}); console.log("Aperto il Popup");}}>
                            <i className="functionButtons-icon bi bi-pen-fill"></i>
                        </button>
                        <button type="button" className="functionButtons-button" onClick={this.deleteElement}>
                            <i className="functionButtons-icon bi bi-x-lg"></i>
                        </button>

                        <Modal open={this.state.open} onClose={() => this.setState({open: false})}>
                            {this.RenderForm()}
                        </Modal> 
                </div>  
            );
        }
        else
        {
            return null;
        }
    }
}

//https://formatjs.io/docs/getting-started/installation/