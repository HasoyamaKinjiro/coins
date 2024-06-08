import React from 'react';
import './App.css';
import Search from './components/Search';

const App = () => {
    return (
        <div className="app">
            <div className="header">
                <Search />
            </div>
        </div>
    );
};

export default App;
