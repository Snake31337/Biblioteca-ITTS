import NavBar from './Navbar';
import SideNavBar from './SideNavBar';

import '../CSS/Home.scss';
import '../CSS/NotFound.scss'

export default function NotFound(){

    return(
        <div>
            <h1 className='error'>404 Page not found</h1>    
        </div>
    );
}