import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../store/Actions/auth'
import {useNavigate,Navigate} from 'react-router-dom'

const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPass] = useState('')
  const pending = useSelector(state => state.auth.pending) 
  const err = useSelector(state => state.auth.err)   
  const loggedIn = useSelector(state => state.auth.loggedIn)   
  const user = useSelector(state => state.auth.user)   
  const dispatch = useDispatch();
  const navigate = useNavigate()



  const Submit =(e)=>{

    e.preventDefault()
    dispatch(loginUser(email,password))
  }

  useEffect(()=>{

    if(loggedIn === true && user ){
      // <Redirect 
      navigate('/')
    }



  },[loggedIn,user])
  return (
    <form className='auth-form' onSubmit={Submit}>
    {err && <span>{err}</span>}
    <h2>Login</h2>
    <label>
      <span>Email</span>
      <input required type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
    </label>
    <label>
      <span>Password</span>
      <input required type='password' value={password} onChange={(e)=>setPass(e.target.value)} />
    </label>
    {pending && <button className='btn' disabled>loading...usually takes 40 seconds</button>}
    {!pending && <button className='btn'>Login</button>}
  </form>
  )
}

export default Login