import React, { useState } from 'react';
import PageHeader from './components/PageHeader';
import './App.css';

function App() {
    const [page, setPage] = useState('users')
    return (
        <div className="App">
            <PageHeader page={page} setPage={(e) => setPage(e)}/>
        </div>
    );
}

export default App;
