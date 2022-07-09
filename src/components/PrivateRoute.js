import React from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate,useNavigate} from 'react-router-dom'
import Login from '../pages/Login';


const PrivateRoutes=()=>{
    const auth = useSelector(state => state.auth.loggedIn)
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    if(!auth && !user){
      return navigate('/login')
    }else{
      <Outlet />
    }
  // return (
  //   auth ? <Outlet /> : (<Navigate to='/login' />)
  // )
}

export default PrivateRoutes;