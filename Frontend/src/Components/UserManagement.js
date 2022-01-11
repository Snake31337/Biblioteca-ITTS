
import '../CSS/UserManagement.scss'
import '../CSS/Home.scss';
import NavBar from './Navbar';
import UserTable from './UserTable';
import UserForm from './UserForm'

function UserManagement() {
    return (
        <div>
            <div className="navBar-container">
                <NavBar />
            </div>
            <div className="centered-media">
                <h1 className="title">Utenti</h1>
                <UserForm />
                <UserTable />
            </div>
        </div>
    );
}


export default UserManagement;