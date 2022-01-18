import FunctionButtons from "./FunctionButtons";





function Table() {
    return(
        <div className="table-container">
                    <table className="book-table">
                        <thead>
                            <tr className='first-row'>
                                <th><i class="bi bi-fingerprint"></i>ID</th>
                                <th><i className="bi bi-file-earmark-font"></i>Titolo</th>
                                <th><i className="bi bi-people-fill"></i>Autore/i</th>
                                <th><i className="bi bi-house"></i>Editore</th>
                                <th><i className="bi bi-calendar-event"></i>Anno</th>
                                <th><i className="bi bi-translate"></i>Lingua</th>
                                <th><i className="bi bi-book"></i>Stato</th>
                                <th className="functionButtons-column"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.data.map((decodedData) => (
                                    <tr key={decodedData.CodiceLibro}>
                                        <td>{decodedData.CodiceLibro}</td>
                                        <td>{decodedData.Titolo}</td>
                                        <td>{decodedData.Autore}</td>
                                        <td>{decodedData.Editore}</td>
                                        <td>{decodedData.AnnoPubblicazione}</td>
                                        <td>{decodedData.Lingua}</td>
                                        <td>{decodedData.Stato}</td>
                                        <td className="functionButtons-cell">
                                            <FunctionButtons/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
    );
}


export default Table;
