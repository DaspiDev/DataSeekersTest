import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from './components/PageHeader';
import Users from './components/Users';
import './App.css';
import UserForm from './components/UserForm';
import ConnectUser from './components/ConnectUser';
import Connections from './components/Connections';
import Stats from './components/Stats';

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
            {
                page === 'connections' && 
                    <Connections
                        list={users}/>
            }
            {
                page === 'addConnection' && 
                    <ConnectUser
                        list={users}  
                        closeForm={() => setPage('users')}/>
            }
            {
                page === 'stats' && 
                    <Stats
                        list={users}/>
            }
        </div>
    );
}

export default App;
