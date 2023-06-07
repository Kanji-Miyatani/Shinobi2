import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import Rooms from './components/Rooms';
import Chat from './components/Chat';
import { Layout } from './layout/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={ <Login />} />
            <Route path="/" element={<Layout />} />
          </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
