import { NavLink } from 'react-router-dom';
import '../CSS/SideNavBar.scss';
import {hyperlinks} from './Pages'

function SideNavBar() {

    return (
        <div className="sideNavBar">
            {
                hyperlinks.map((pages) => (
                    <NavLink className={({ isActive }) => (isActive ? 'sideNavBar-link sideNavBar-link-active' : 'sideNavBar-link')} to={pages.link}>{pages.label}</NavLink>
                ))
            }
        </div>
    );
}


export default SideNavBar;