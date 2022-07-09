import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import temple from '../assets/temple.svg'
import './Navbar.css'
import {LogOut} from '../store/Actions/auth'



const Navbar = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state=> state.auth.loggedIn)
  const user = useSelector(state=> state.auth.user)

  const Logout=()=>{
    dispatch(LogOut())
  }

  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img  src={temple} alt='dojo'/>
                <span>The Dojo</span>
            </li>
            {!user && (
              <>
              <li className='link'><Link to='/login'>login</Link></li>
              <li className='link'><Link to='/signup'>signup</Link></li>
              </>
            )}
            {user && (
              <li><button className='btn' onClick={Logout}>Logout</button></li>

            )}
            {/* {!loggedIn && <li><button className='btn' disabled>logged Out</button></li>} */}
        </ul>
    </div>
  )
}

export default Navbar