import UserManagement from "./UserManagement";
import Home from './Home'
import Borrow from './Borrow'

export const hyperlinks = 
[
    {
        label: "Lista Libri",
        link: "/",
        class: <Home />
    },
    {
        label: "User Management",
        link: "/usermanagement",
        class: <UserManagement />
    },
    {
        label: "Prestiti",
        link: "/borrow",
        class: <Borrow />
    }
]