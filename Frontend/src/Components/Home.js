import '../CSS/Home.scss';
import NavBar from './Navbar';
import SearchBar from './SearchBar';
import SideNavBar from './SideNavBar';
import BookTable from './BookTable';
import BookTableLoader from './BookTableLoader';
import React from 'react';

class Home extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = { databaseData: null };
    }

    fetchRemoteData(searchKey)
    {
        this.setState({ databaseData: null });

        if(searchKey == null)
        {
            fetch('http://localhost:8080/',
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: 'listBooks',
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ databaseData: responseJson});
            })
            .then((response) => {
                console.log(response.json())
            })
            .catch((error) => {
                console.error(error);
            });
        }
        else
        {
            fetch('http://localhost:8080/',
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: 'searchBook',
                    keyword: searchKey,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ databaseData: responseJson});
            })
            .then((response) => {
                console.log(response.json())
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
    }

    updateKeyword = (keyword) =>
    {
        this.fetchRemoteData(keyword);
    }

    componentDidMount()
    {
        this.fetchRemoteData();
    }

    render()
    {
        return (
            <div className="Home">
                <header className="navBar-container">
                    <NavBar />
                </header>
                <div className="grid-container">
                    <div className="grid-item left-sidebar">
                        <div className="sideNavBar-container">
                            <SideNavBar />
                        </div>
                    </div>
                    <div className="grid-item main">
                        <div className="main-wrapper">
                            <div className="main-item searchBar-container">
                                <SearchBar updateKeyword={this.updateKeyword} />
                            </div>

                            <div className="main-item bookTable-container">
                                { this.state.databaseData == null ? <BookTableLoader /> : <BookTable data={this.state.databaseData} /> }
                            </div>
                        </div>
                    </div>
                    <div className="grid-item rigth-sidebar"></div>
                </div>
            </div>
        );
    }   
}

export default Home;