import { ReactNode } from 'react'
import Header from './Header';
import {Route,Routes} from 'react-router-dom'
import Rooms from '../components/Rooms';
import Chat from '../components/Chat';
type Props = {
  children: ReactNode;
}

export function Layout() {
  return(
    <div className="layout">
        <Header />
        <Routes>
            <Route path="/" element={<Rooms />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    </div>
  )
}