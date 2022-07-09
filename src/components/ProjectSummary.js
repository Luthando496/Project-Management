import React from 'react'
import Avatar from './Avatar'

const ProjectSummary = ({project}) => {
  return (
    <div>
        <div className='project-summary'>
            <h2 className='page-title'>{project.name}</h2>
            <p className='due-date'>Project Due By{project.dueDate.toDate().toDateString()}</p>
            <p className='project-details'>
                {project.details}
            </p>
            <h4>Assigned To:</h4>
            
            <div className='assigned-users'>

            {project.assignedUserslist.map(user=>(
                <div key={user.id}>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default ProjectSummary