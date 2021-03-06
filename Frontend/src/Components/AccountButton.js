import '../CSS/AccountButton.scss';
import { Link, Routes, Route } from "react-router-dom";
function AccountButton() {
    return (
        <div className="account-button">
            <Link to="/usermanagement" className="accountButton-container" href="#">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" className="icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                <span>Utenti</span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="dropdown-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
            </Link>
            <div className="dropdown-content">
                <a className="accountButton-links" href="#">Login</a>
                <a className="accountButton-links" href="#">Registrati</a>
            </div>
        </div>
    )
}

export default AccountButton
