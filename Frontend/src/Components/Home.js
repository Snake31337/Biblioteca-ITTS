import '../CSS/Home.scss';
import NavBar from './Navbar';
import SearchBar from './SearchBar';
import BookTable from './BookTable';

function Home() {
    return (
        <div className="grid-container">
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
        </div>
    );
}


export default Home;