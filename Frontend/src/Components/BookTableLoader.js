import '../CSS/Table.scss';
import 'semantic-ui-css/semantic.min.css'   
import React from 'react';
import { Loader } from 'semantic-ui-react'

function BookTableLoader()
{
    return (
        <div className="table-container">
            <div className="book-table">
                <br></br>
                    <Loader active indeterminate inline='centered'>Fetching data</Loader>
                <br></br>
            </div>
        </div>
    )
}

export default BookTableLoader;