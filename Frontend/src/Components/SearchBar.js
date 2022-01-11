import React from "react";
import '../CSS/SearchBar.scss';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function SearchBar() {
    return(

        <div className="searchBar-container">
            <div className="searchBar">
                <input type="text" placeholder="Quale libro vuoi cercare?" className="searchInputBox"></input>
                <button type="submit" className="searchButton">
                    <Link to="/search" className="bi bi-search"></Link>
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