import '../CSS/SearchBar.scss';


function SearchBar() {
    return(
        <div className="searchBar-container">
            <div className="searchBar">
                <input type="text" placeholder="Quale libro vuoi cercare?" className="searchInputBox"></input>
                <button type="submit" className="searchButton">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </div>  
    );
}

/*
<div className="filter-container">
    <a href="#">Filtri avanzati</a>
</div>
*/

//https://formatjs.io/docs/getting-started/installation/
export default SearchBar;