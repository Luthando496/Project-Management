import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Create.css'
import Select from 'react-select'
import {Timestamp} from 'firebase/firestore'
import {CreateProject} from '../store/Actions/auth'
import {useNavigate} from 'react-router-dom'


const categories = [
  { value: 'development'},
  { value: 'design'},
  { value: 'sales'},
  { value: 'marketing'},
]

const Create = () => {
  const [name,SetName] = useState('')
  const [dueDate,setDueDate] = useState('')
  const [category,setCategory] = useState('')
  const [details,setDetails] = useState('')
  const navigate = useNavigate()
  const [assignedUsers,setUsers] = useState([])
  const users = useSelector(state=> state.auth.users)
  const loggedIn = useSelector(state=> state.auth.loggedIn)
  const user = useSelector(state=> state.auth.user)
  const onUsers = users && users.map(user=>{
    return {
      value:user,label:user.displayName
    }
  })
  const dispatch = useDispatch()

  const Submit =(e)=>{
    e.preventDefault()
    console.log(category)

    // if(!category){
    //   return
    // }
    const assignedUserslist =assignedUsers.map(i=>{
      return {
        displayName:i.value.displayName,
        photoURL:i.value.imageUrl,
        id:i.value.id,
      }
    })

    // console.log(assignedUsers)
    const createdBy ={
      displayName:user.user.displayName,
      photoURL:user.user.photoURL,
      id:user.uid
    }

    const project = {
      name,details,category:category,dueDate:Timestamp.fromDate(new Date(dueDate)),comments:[],createdBy,
      assignedUserslist
    }

    // const data = {name,category,details,dueDate,assignedUsers}
    dispatch(CreateProject(project,assignedUserslist))
    // navigate('/')

  }

  useEffect(()=>{
    if(!loggedIn && !user){
      navigate('/login')
    }

  },[user])



  return (
    <div className='create-form '>
      <h2 className='page-title'>Ceate New Form</h2>
      <form onSubmit={Submit}>
          <label>
            <span>Project name:</span>
            <input type='text' onChange={(e)=> SetName(e.target.value)} value={name} required/>
          </label>

          <label>
            <span>Project Details:</span>
            <textarea type='text' onChange={(e)=> setDetails(e.target.value)} value={details} required></textarea>
          </label>

          <label>
            <span>Due Date:</span>
            <input type='date' onChange={(e)=> setDueDate(e.target.value)} value={dueDate} required/>
          </label>
          <label>
            <span>Project Assigned to:</span>
            <Select options={onUsers} onChange={(option) => setUsers(option)} isMulti />
            </label>

          <label>
            <span>Project Category:</span>
            {/* <Select options={categories} onChange={(option) => setCategory(option)} /> */}
            <select onChange={(e) => setCategory(e.target.value)}>
              {categories.map(value=>(
                <option value={value.value}>{value.value}</option>

              ))}
            </select>
          </label>
            {/* <select onChange={(e) => setUsers(e.target.value)}>
              {users && users.map(user=>(
                <option value={user.id}>{user.displayName}</option>
              ))}
            </select> */}


          <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}

export default Create