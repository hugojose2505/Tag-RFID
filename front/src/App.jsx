import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/NavBar';
import Rotas from './routes';


const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Rotas/>
        </BrowserRouter>
    );
};

export default App;