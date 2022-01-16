import UserManagement from "./UserManagement";
import Home from './Home'
import BookManagement from "./BookManagement";
import Borrow from './Borrow'

export const hyperlinks = 
[
    {
        label: "Lista Libri",
        link: "/",
        class: <BookManagement />
    },
    {
        label: "Gestione utenti",
        link: "/gestioneutenti",
        class: <UserManagement />
    },
    {
        label: "Prestiti",
        link: "/prestiti",
        class: <Borrow />
    }
]