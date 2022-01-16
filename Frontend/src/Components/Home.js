import React from 'react';

import '../CSS/Home.scss';
import NavBar from './Navbar';
import SearchBar from './SearchBar';
import SideNavBar from './SideNavBar';
import BookTable from './BookTable';
import BookForm from './BookForm';
import BookManagement from './BookManagement';

import {currentIP} from './IPAddress'
import { Routes, Route } from 'react-router';
import {hyperlinks} from './Pages'
import UserManagement from './UserManagement';
import NotFound from './NotFound';



class Home extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = { databaseData: null };
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
                            <Routes>
                                {hyperlinks.map((pages) => (
                                    <Route path={pages.link} element={pages.class}></Route>
                                ))
                                }
                                <Route path="*" element={<NotFound />}/>
                            </Routes>
                                
                        </div>
                    </div>
                    <div className="grid-item rigth-sidebar"></div>
                </div>
            </div>
        );
    }   
}

export default Home;