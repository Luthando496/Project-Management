import React from 'react'
import './Sidebar.css'
import DashIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { NavLink,Redirect } from 'react-router-dom'
import Avatar from './Avatar'
import {useSelector} from 'react-redux'

const Sidebar = () => {
  const user = useSelector(state => state.auth.user)
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className='user'>
        <Avatar src={user && user.user.photoURL}/>
        <p>hey {user && user.user.displayName}</p>
        </div>
      <nav className='links'>
        <ul>
          <li>
            <NavLink to="/">
              <img src={DashIcon} alt="Dash" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/create">
              <img src={AddIcon} alt="AddIcon" />
              <span>New Project</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  )
}

export default Sidebar