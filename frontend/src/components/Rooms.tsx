import React, { useEffect ,useState} from 'react'
import * as roomsApi from '../api/rooms'
import { Link, useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms,setRooms ]=useState<roomsApi.Room[]> ([]);
  const navigate = useNavigate();
  useEffect(()=>{
    roomsApi.getAll().then((data)=>{
      setRooms(data);
    }).catch(()=>{
      console.log('failed to get rooms');
      navigate('/');
    });
  },[]);

  return (
    <div>
      <h1>部屋選択</h1>
      <ul>
        {
          rooms.map((data)=>{
            return(
              <li key={data.id}>
                <Link to={'/chat/'+ data.id}>{data.name}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Rooms