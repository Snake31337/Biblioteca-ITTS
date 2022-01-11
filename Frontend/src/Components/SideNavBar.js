import { NavLink } from 'react-router-dom';
import '../CSS/SideNavBar.scss';

function SideNavBar() {

    return (
        <div className="sideNavBar">
            <NavLink className={({ isActive }) => (isActive ? 'sideNavBar-link sideNavBar-link-active' : 'sideNavBar-link')} to={"/"}>Lista Libri</NavLink> {/*Se è attivo mette come classe 'sideNavBar-link sideNavBar-link-active', altrimenti solo 'sideNavBar-link' */}
            <NavLink className={({ isActive }) => (isActive ? 'sideNavBar-link sideNavBar-link-active' : 'sideNavBar-link')} to={"/usermanagement"}>User Management</NavLink>
        </div>
    );
}


export default SideNavBar;