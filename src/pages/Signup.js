import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../store/Actions/auth'
import './Signup.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const Signup = () => {
  const [displayName,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPass] = useState('')
  const [thumbnail,setThumb] = useState(null)
  const dispatch = useDispatch();
  const err = useSelector(state => state.auth.err)
  const pending = useSelector(state => state.auth.pending)
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const user = useSelector(state => state.auth.user)
  const [thumbnailError,setThumbError] = useState(null)
  const navigate = useNavigate()

  const handleChange =(e)=>{
    setThumb(null)
    let selected = e.target.files[0];
    if(!selected){
      setThumbError('PLease select image')
    }
    if(selected.type !== "image/jpeg"){
      return setThumbError('File should be an image');
    }
    if(selected.size > 8000000){
      return setThumbError('Image size should be less than 100000');
    }

    setThumbError(null)
    setThumb(selected)
    }

    const Submit =(e)=>{
      e.preventDefault()
      console.log(pending)
      dispatch(register(displayName,email,password,thumbnail))


    }

    useEffect(()=>{

      if(loggedIn && user){
        // <Redirect 
        navigate('/')
      }
  
    },[loggedIn])

  return (
    <form className='auth-form' onSubmit={Submit}>
      {err && <span>{err}</span>}
      <h2>Signup</h2>
      <label>
        <span>Email</span>
        <input required type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      </label>
      <label>
        <span>Password</span>
        <input required type='password' value={password} onChange={(e)=>setPass(e.target.value)} />
      </label>
      <label>
        <span>displayName</span>
        <input required type='text' value={displayName} onChange={(e)=>setName(e.target.value)} />
      </label>
      <label>
        <span>Profile thumbnail</span>
        {thumbnailError &&<div className='error'>{thumbnailError}</div>}
        <input required type='file' onChange={handleChange}/>
      </label>
      {pending && <button className='btn' disabled>loading...usually takes 40 seconds</button>}
      {!pending && <button className='btn'>Signup</button>}
    </form>
  )
}

export default Signup;