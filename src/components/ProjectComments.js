import { Timestamp } from 'firebase/firestore'
import React,{useState} from 'react'
import { useSelector } from 'react-redux'

const ProjectComments = () => {
    const [comment,setComment] = useState('')

    const user = useSelector(state=> state.auth.user)

    const Submit= async(e)=>{
        e.preventDefault();

        const commentToAdd = {
            displayName:user.user.displayName,
            photoURL:user.user.photoURL,
            content:comment,
            createdAt:Timestamp.fromDate(new Date()),
            id:Math.random() * 100000
        }

        console.log(commentToAdd)
    }
  return (
    <div className='project-comments'>
        <h4>Project Comments</h4>

        <form className='add-comment' onSubmit={Submit}>
            <label>
                <span>Add new comment:</span>
                <textarea
                required
                onChange={(e)=> setComment(e.target.value)}
                value={comment}
                >

                </textarea>
            </label>
            <button className='btn'>Add Comment</button>
        </form>

    </div>
  )
}

export default ProjectComments