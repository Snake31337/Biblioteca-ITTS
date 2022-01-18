import React from 'react';
import { currentIP } from './IPAddress';
import SearchBar from './SearchBar';
import Table from './Table';




export default class Management extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          databaseData: null
        };

        this.fetchRemoteData = this.fetchRemoteData.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this);
    }

    fetchRemoteData(searchKey)
    {
        this.setState({ databaseData: null });

        if(searchKey == null)
        {
            fetch(currentIP,
            {
                method: 'POST',
                body: JSON.stringify
                ({
                    type: 'listBooksWithPrestato',
                    orderBy: 'Titolo',
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ databaseData: responseJson});
            })
            .then((response) => {
                console.log(response.json())
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }
    
    render() {
        return(
            <>
                <SearchBar />
                <Table />
            </>
        );
    }
}