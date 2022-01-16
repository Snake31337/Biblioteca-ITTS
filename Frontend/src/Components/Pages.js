import UserManagement from "./UserManagement";
import Home from './Home'
import BookManagement from "./BookManagement";
//import Borrow from './Borrow'

export const hyperlinks = 
[
    {
        label: "Lista Libri",
        link: "/",
        class: <BookManagement />
    },
    {
        label: "User Management",
        link: "/usermanagement",
        class: <UserManagement />
    },
    /*{
        label: "Prestiti",
        link: "/borrow",
        class: <Borrow />
    }*/
]