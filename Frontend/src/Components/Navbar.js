import logo from '../Images/logo.bmp';
import '../CSS/NavBar.scss';


function NavBar() {
    return(
        <nav className="navBar">
            <div className="container-logo-link">
                <a className="link logo-link" href="#">
                    <img className="logo" src={logo} alt="Logo dell'ITTS O.Belluzzi"/>
                    <p className='logo-text'>Biblioteca ITTS</p>
                </a>
            </div>
            <div className="link-container">
                <a className="link" href="#">Home</a>
                <a className="link" href="#">Chi siamo</a>
                <a className="link" href="#">Lorem</a>
                <a className="link" href="#">ipsum</a>
            </div>
        </nav>
    );
}


export default NavBar;