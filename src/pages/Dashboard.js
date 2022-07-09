import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProjectList from '../components/ProjectList'
import { getCollections } from '../store/Actions/auth'


const Dashboard = () => {
  const user = useSelector(state => state.auth.user)
  const projects = useSelector(state => state.auth.projects)
  const proError = useSelector(state => state.auth.proError)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!user){
      navigate('/login')
    }

    dispatch(getCollections())

  },[user])
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {proError && <p className='error'>{proError}</p>}
      {projects && <ProjectList projects={projects} />}

    </div>
  )
}

export default Dashboard