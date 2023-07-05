import React, { useEffect ,useState} from 'react'
import * as roomsApi from '../api/rooms'
import { Link, useNavigate } from "react-router-dom";
import { Badge, } from '@mui/material';
import People from '@mui/icons-material/People';
import { Room } from '../interfaces/models';

function Rooms() {
  const [rooms,setRooms ]=useState<Room[]> ([]);
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
                <Badge color="secondary" badgeContent={`${data.users.length}/${data.maximum}`}>
                  <People />
                </Badge>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Rooms