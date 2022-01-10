function UserTable(){

    return(

    <div className="table-container">
        <table className="book-table">
            <thead>
                <tr>
                    <th><i className="bi bi-file-earmark-font"></i>C. Fiscale</th>
                    <th><i className="bi bi-people-fill"></i>Nome/i</th>
                    <th>Cognome</th>
                    <th><i class="bi bi-calendar-event"></i>Registrazione Tessera</th>
                    <th><i class="bi bi-globe"></i>Indirizzo</th>
                    <th><i class="bi bi-globe"></i>Numero Tessera</th>
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

export default UserTable;