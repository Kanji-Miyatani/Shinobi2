import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import { Layout } from './layout/Layout';
import Rooms from './components/Rooms';
import { CookiesProvider } from "react-cookie";
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={ <Login />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/chat/:roomId" element={<Chat />} />
            </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </div>
   
  );
}

export default App;
