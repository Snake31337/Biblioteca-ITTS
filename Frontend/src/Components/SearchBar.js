import React from "react";
import '../CSS/SearchBar.scss';

class SearchBar extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = { keyword: "" };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });  
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.props.updateKeyword(this.state.keyword);
    }

    render()
    {
        return (
            <div className="searchBar-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="searchBar">
                        <input type="text" name="keyword" placeholder="Quale libro vuoi cercare?" className="searchInputBox" onChange={this.handleInputChange}></input>
                        <button type='submit' className="searchButton bi bi-search"></button>
                    </div>
                </form>
            </div>  
        );
    }
}

/*
<div className="filter-container">
    <a href="#">Filtri avanzati</a>
</div>
*/

//https://formatjs.io/docs/getting-started/installation/
export default SearchBar;