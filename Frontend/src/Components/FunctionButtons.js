import '../CSS/FunctionButtons.scss'; 
import Modal from './Modal';


// Bottoni per l'Editing e cancellazione
export default function FunctionButtons() {
    function showForm() { // show editing form
        alert("xd");
    }

    function deleteElement(id){
        let text = "Sei sicuro di voler cancellare questo elemento?";
        if(window.confirm(text) == true){
            alert("Cancellato");
            //Inserire richiesta di delete qui dentro
        }else{

        }
    }
    
    return(
        <div className="FunctionButtons">
                <button type="button" className="functionButtons-button" onClick={showForm}>
                    <i className="functionButtons-icon bi bi-pen-fill"></i>
                </button>
                {/* Raga per qualche motivo se aggiungo una funzione al pulsante cancella si attiva solo se ci vai sopra la row 
                    Ho capito, per qualche motivo è solo quando nella funzione ci metti le parentesi {deleteElement()}
                    Ma come facciamo a passargli l'ID se così è buggato?
                */}
                <button type="button" className="functionButtons-button" onClick={deleteElement}>
                    <i className="functionButtons-icon bi bi-x-lg"></i>
                </button> 
        </div>  
    );
}

//https://formatjs.io/docs/getting-started/installation/