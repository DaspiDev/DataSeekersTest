import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from './components/PageHeader';
import Users from './components/Users';
import './App.css';
import UserForm from './components/UserForm';

function App() {
    const [page, setPage] = useState('users');
    const [users, setUsers] = useState([])
    const [connectingUser, setConnectingUser] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.error(error);
            })
    }, [page])
    return (
        <div className="App">
            <PageHeader page={page} setPage={(e) => setPage(e)} />
            {
                page === 'users' && 
                    <Users 
                        list={users} 
                        connectUser={() => setPage('addConnection')} 
                        setConnectingUser={(e) => setConnectingUser(e)} />
            }
            {
                page === 'addUser' && 
                    <UserForm closeForm={() => setPage('users')}/>
            }
        </div>
    );
}

export default App;
