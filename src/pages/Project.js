import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import ProjectSummary from '../components/ProjectSummary'
import {getSingleDocument} from '../store/Actions/auth'
import './Project.css'



const Project = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const err = useSelector(state => state.auth.singleError)
  const project = useSelector(state => state.auth.singlePro)
  console.log(project)

  if(err){
    return <div className='error'>{err}</div>
  }




  useEffect(()=>{
    dispatch(getSingleDocument(id))
  },[])
  return (
    <div className='project-details'>
      {project && <ProjectSummary project={project}/> }
    </div>
  )
}

export default Project