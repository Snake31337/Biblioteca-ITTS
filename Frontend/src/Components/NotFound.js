import NavBar from './Navbar';
import SideNavBar from './SideNavBar';

import '../CSS/Home.scss';
import '../CSS/NotFound.scss'

export default function NotFound(){

    return(
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
                                <h1 className='error'>404 Page not found</h1>
                            </div>

                        </div>

                    </div>
                    <div className="grid-item rigth-sidebar"></div>
                </div>
            </div>
    );
}