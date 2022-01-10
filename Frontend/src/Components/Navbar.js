import logo from '../Images/logo.bmp';
import '../CSS/NavBar.scss';
import AccountButton from './AccountButton';
import LanguageSelect from './LanguageSelect';


function NavBar() {
    return(
        <nav className="navBar">
            <div className="nav-left nav-items">
                <LanguageSelect> </LanguageSelect>
            </div>

            <div className="container-logo-link nav-centered">
                <a className="link logo-link" href="#">
                    <img className="logo" src={logo} alt="Logo dell'ITTS O.Belluzzi"/>
                </a>    
            </div>
            
            <div className="nav-right nav-items" > 
                <button>Tema Scuro</button>
                <AccountButton> </AccountButton>
            </div>
        </nav>
    );
}


export default NavBar;