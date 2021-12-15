import '../CSS/BookTable.scss';

function BookTable() {
    return (
        <div className="table-container">
            <table className="book-table">
                <thead>
                    <tr>
                        <th><i className="bi bi-file-earmark-font"></i>Titolo e ISBN</th>
                        <th><i className="bi bi-people-fill"></i>Autore/i</th>
                        <th>Editore</th>
                        <th><i class="bi bi-calendar-event"></i>Anno</th>
                        <th><i class="bi bi-globe"></i>Lingua</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The things they carried</td>
                        <td>Tim O' Brien</td>
                        <td>IDK</td>
                        <td>1995</td>
                        <td>Inglese</td>
                    </tr>
                    <tr>
                        <td>Of mice and men</td>
                        <td>Leonardo Grimaldi</td>
                        <td>LOL</td>
                        <td>2004</td>
                        <td>Inglese</td>
                    </tr>   
                </tbody>
            </table>
        </div>
    );
}


export default BookTable;