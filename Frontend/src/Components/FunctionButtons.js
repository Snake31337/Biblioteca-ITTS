import '../CSS/FunctionButtons.scss'    



// Bottoni per l'Editing e cancellazione
function FunctionButtons() {
    function showForm() { // show editing form
        alert("xd");
    }
    
    return(
        <div className="FunctionButtons">
                <button type="button" className="functionButtons-button" onClick={showForm}>
                    <i className="functionButtons-icon bi bi-pen-fill"></i>
                </button>
                <button type="button" className="functionButtons-button">
                    <i className="functionButtons-icon bi bi-x-lg"></i>
                </button> 
        </div>  
    );
}

//https://formatjs.io/docs/getting-started/installation/
export default FunctionButtons;