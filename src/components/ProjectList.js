import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectList.css'
import Avatar from '../components/Avatar'

const Projects = (projects) => {
  // console.log(projects && projects.projects)
  return (
    <div className='project-list'>
        {projects && projects.length === 0 && <h2>No Projects Yet</h2>}
        {projects && projects.projects && projects.projects.map(doc=>(
          // <h1>{doc.name}</h1>
          <Link to={`/projects/${doc.id}`} key={doc.id}>
          <h4>{doc.name}</h4>
          
          <p>Due by{doc.dueDate.toDate().toDateString()}</p>
          {doc.assignedUserslist.map(user=>(
                <div key={user.id}>
                    <Avatar src={user.photoURL} />
                </div>
            ))}

          </Link>
      ))}
      
    </div>
  )
}

export default Projects