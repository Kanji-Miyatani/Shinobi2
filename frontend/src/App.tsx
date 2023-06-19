import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import { Layout } from './layout/Layout';
import Rooms from './components/Rooms';
import { CookiesProvider } from "react-cookie";
import Chat from './components/Chat';
import { useAuthorize } from './services/authService';


function App() {
  const {authorized}=useAuthorize();
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            {authorized?(
              <>
                <Route path="/" element={ <Rooms />} />
                <Route path="/chat/:roomId" element={<Chat />} />
              </>
            ) :(
              <Route path="/" element={ <Login />} />
            )}
            
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </div>
   
  );
}

export default App;
