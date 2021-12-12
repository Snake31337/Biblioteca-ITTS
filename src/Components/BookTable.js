import '../CSS/BookTable.scss';

function BookTable() {
    return (
        <div className="table-container">
            <table className="book-table">
                <tr>
                    <th>Titolo e ISBN</th>
                    <th>Autore/i</th>
                    <th>Editore</th>
                    <th>Anno</th>
                    <th>Lingua</th>
                </tr>
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
            </table>
        </div>
    );
}


export default BookTable;