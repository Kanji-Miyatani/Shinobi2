import React, { createContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import { Layout } from './layout/Layout';
import Rooms from './components/Rooms';
import { CookiesProvider } from "react-cookie";
import Chat from './components/Chat';
import { useAuthorize } from './hooks/useAuth';
import { usePersistState } from './hooks/usePersistState';

export const CustomBgImage = createContext({} as {
  bgImage: string | null
  setBgImage: (v: string | null) => void
});

function App() {
  //チャット背景をグローバルで状態管理
  const [bgImage,setBgImage] = usePersistState<string|null>({
    key: "shinobiBG",
    initialValue: null
   });
  const bgState = {
    bgImage,setBgImage
  }
  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <CustomBgImage.Provider value={bgState}>
            <Routes>
              <Route path="/" element={ <Login />} />
              <Route path="/rooms" element={ <Rooms />} />
              <Route path="/chat/:roomId" element={<Chat />} />
            </Routes>
          </CustomBgImage.Provider>
        </BrowserRouter>
      </CookiesProvider>
    </div>
   
  );
}

export default App;
