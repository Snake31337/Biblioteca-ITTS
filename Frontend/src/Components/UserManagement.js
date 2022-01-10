
import '../CSS/AccountManagement.scss'
import '../CSS/Home.scss';
import NavBar from './Navbar';
import BookTable from './UserTable';
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
                <BookTable />
            </div>
        </div>
    );
}


export default UserManagement;