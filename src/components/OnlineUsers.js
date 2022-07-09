import React, { useState,useEffect } from 'react'
// components
import Avatar from './Avatar'
import {useSelector,useDispatch} from 'react-redux'


// styles
import './OnlineUsers.css'
import { getUsers } from '../store/Actions/auth'

export default function OnlineUsers() {
    const pending = useSelector(state => state.auth.pending)
    const error = useSelector(state => state.auth.err)
    const users = useSelector(state => state.auth.users)
    const [documents , setDocumenst] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch(getUsers())

    },[])


  return (
    <div className="user-list">
      <h2>All Users</h2>
      {pending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {users && users.map(user => (
        <div key={user.id} className="user-list-item">
          {user.online && <span className="online-user"></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.imageUrl} />
        </div>
      ))}
    </div>
  )
}