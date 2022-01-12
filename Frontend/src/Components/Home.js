import '../CSS/Home.scss';
import NavBar from './Navbar';
import SearchBar from './SearchBar';
import BookTable from './BookTable';
import SideNavBar from './SideNavBar';
import UserForm from './UserForm';
import { Routes, Route } from 'react-router';


function Home() {
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
                            <SearchBar />
                        </div>
                        
                        <div class="main-item bookTable-container">
                            <Routes>
                                <Route path="/" element={<BookTable />}> </Route>
                                <Route path="usermanagement" element={<UserForm />}></Route>
                            </Routes>  
                        </div>
                    </div>
                </div>
                <div className="grid-item rigth-sidebar"></div>
            </div>

        </div>
        


        /*<div className="grid-container">
            <div className="grid-item left-sidebar top-left">a</div>
            <div className="grid-item home-top">
                <div className="navBar-container">
                    <NavBar />
                </div>
            </div>
            <div className="grid-item right-sidebar top-right">c</div>
            <div className="grid-item left-sidebar">d</div>
            <div className="grid-item">
                <div className="body">
                    <div className="searchBar-container">
                        <SearchBar />
                    </div>
                    <BookTable />
                </div>
            </div>
            <div className="grid-item right-sidebar">f</div>
        </div>*/
    );
}


export default Home;