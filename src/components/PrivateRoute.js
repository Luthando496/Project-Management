import React from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom'


const PrivateRoutes=()=>{
    const auth = useSelector(state => state.auth.loggedIn)
  return (
    auth ? <Outlet /> : <Navigate to='/signup'/>
  )
}

export default PrivateRoutes;