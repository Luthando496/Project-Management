import { authSliceAction } from "../store";
import { signOut ,createUserWithEmailAndPassword , updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { ref,uploadBytesResumable ,getDownloadURL } from "firebase/storage";
import { auth,storage,db } from "../../firebase/firebase";
import { collection,doc, setDoc,updateDoc,query, onSnapshot ,addDoc,getDoc } from "firebase/firestore";




export const register =(displayName,email,password,file)=>{
    return async dispatch=>{
        // Create a root reference
        
        try{
            
            
            dispatch(authSliceAction.PendingTrue())
            const user  = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user,'User URL is Here')

            
            const imageRef = ref(storage,  `thumbnails/${user.user.uid}/${file.name}`)
            const imageUpload =  await uploadBytesResumable(imageRef, file)
            
            const imageUrl=await getDownloadURL(imageUpload.ref)
           console.log(imageUrl,'Image URL is Here')


           await updateProfile(auth.currentUser,{
            photoURL:imageUrl,
            displayName,
            uid:user.user.uid
           })

        //    create user document
          const userCollection =  await collection(db,'users')
           await setDoc(doc(userCollection,user.user.uid),{
            displayName,
            online:true,
            imageUrl
           })
           
           dispatch(authSliceAction.login({user:user.user.providerData[0],uid:user.user.uid}))
           dispatch(authSliceAction.PendingFalse())
        // console.log(displayName,email,file)
            
        }catch(err){
            dispatch(authSliceAction.loginError(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
              ))
        }

    }
}



export const LogOut =()=>{
    return async(dispatch,useState)=>{
        
        try{
            const user = useState().auth.user.uid
            dispatch(authSliceAction.PendingTrue)


            const userCollection =  doc(db,'users',user)
            
            await updateDoc(userCollection,{
                online:false,
            });



            await signOut(auth)

            dispatch(authSliceAction.logOut())

        }catch(err){
            dispatch(authSliceAction.logOutError(err.response && err.response.data.message
                ? err.response.data.message
                : err.message
          ))
        }
    }
}

export const loginUser =(email,password)=>{
    return async dispatch=>{


        try{
            dispatch(authSliceAction.PendingTrue())

            const user = await signInWithEmailAndPassword(auth,email,password)
            console.log(user.user.providerData[0])

            const userCollection =  doc(db,'users',user.user.uid)
            
            await updateDoc(userCollection,{
                online:true,
            });

            dispatch(authSliceAction.login({user:user.user.providerData[0],uid:user.user.uid}))
            dispatch(authSliceAction.PendingFalse())

        }catch(err){
            dispatch(authSliceAction.logOutError(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
        }
    }
}


export const getUsers=()=>{

    return dispatch=>{

        let users = [];
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
              users.push({...doc.data(),id:doc.id});
            });
            //   console.log("Current cities in CA: ", users);
            dispatch(authSliceAction.addUsers((users)))
        });

    }
}





export const CreateProject =(project,assignedUserslist)=>{
    return async dispatch=>{
        // Create a root reference
        
        try{
            const {createdBy,
                name,
                details,
                category,
                dueDate,
                comments,
                } = project
            
            dispatch(authSliceAction.PendingTrue())
            // await setDoc(doc(db,"projects",project), {
            //     project
            //   });

            const users = [...assignedUserslist]
            console.log(users)

            const docRef = await addDoc(collection(db, "projects"),
                {
                    createdBy,
                    name,
                    assignedUserslist,
                    details,
                    category,
                    dueDate,
                    comments,
                    // assignedUserslist
                }
              );
              console.log("Document written with ID: ", docRef.id);
           
        //    dispatch(authSliceAction.login())
           dispatch(authSliceAction.PendingFalse())
        // console.log(displayName,email,file)
            
        }catch(err){
            // dispatch(authSliceAction.loginError(err.response && err.response.data.message
            //         ? err.response.data.message
            //         : err.message,
            //   ))
            console.log(err.response && err.response.data.message
                        ? err.response.data.message
                        : err.message)
        }

    }
}


export const getCollections=()=>{

    return dispatch=>{

        dispatch(authSliceAction.fetchLoad())
        
      try{

        let projects = [];
        const q = query(collection(db, "projects"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({...doc.data(),id:doc.id});
            });
            //   console.log("Current cities in CA: ", users);
            dispatch(authSliceAction.fetchPro((projects)))
            dispatch(authSliceAction.fetchLoadFalse())
        });

    }catch(error){
        dispatch(authSliceAction.fetchError(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
              ))
    }

    }
}






export const getSingleDocument=(id)=>{

    return async dispatch=>{

        dispatch(authSliceAction.singleFetching())
        
      try{


        
                const docRef = doc(db, "projects", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            dispatch(authSliceAction.singleProjectFetch(docSnap.data()))
            dispatch(authSliceAction.singleFetchingDone())



    }catch(error){
        dispatch(authSliceAction.singleProjectFetchError(error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
              ))
    }

    }
}