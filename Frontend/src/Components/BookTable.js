import '../CSS/BookTable.scss';

function BookTable() {
    var testValues = '[{"CodiceLibro":"1","Titolo":"gigi","Lingua":"inglese","Editore":"mondadori","AnnoPubblicazione":"2012","Categoria":"Fantascienza","ISBN":"sg18303"},{"CodiceLibro":"2","Titolo":"A Game of Thrones","Lingua":"Inglese","Editore":"Mondadori","AnnoPubblicazione":"2012","Categoria":"Fantasy","ISBN":"sg18303"},{"CodiceLibro":"3","Titolo":"A Song of Ice and Fire","Lingua":"Inglese","Editore":"Mondadori","AnnoPubblicazione":"2014","Categoria":"Fantasy","ISBN":"sg18303"},{"CodiceLibro":"4","Titolo":"1984","Lingua":"Inglese","Editore":"Feltrinelli","AnnoPubblicazione":"1948","Categoria":"Distopico","ISBN":"SG18303"}]'
    //fetch('/api/index.php').then((Response) => Response.text);
    var libri2;
    fetch('https://localhost:8080',{
        method: 'POST',
        body: {
          type: 'listBooks',
        }
      })
      .then((response) => response.text())
      .then((response) => {console.log(response.text)})

    var libri = JSON.parse(testValues);
    //console.log(libri2);
    console.log(libri);
    console.log(libri[1,0]);
    
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
                    {libri.map((libro) =>(
                        <tr>
                            <td>{libro.Titolo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.Editore}</td>
                            <td>{libro.AnnoPubblicazione}</td>
                            <td>{libro.Lingua}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}


export default BookTable;