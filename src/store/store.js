import {createSlice,configureStore} from '@reduxjs/toolkit'


const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,loggedIn:false,err:null,proError:null,pending:false,users:null,projects:null,loadProject:false,singlePro:null,singleError:null,singleFetch:false},
    reducers:{

        login(state,action){
            state.user = action.payload;
            state.loggedIn = true;
            state.err = null
        },
        PendingTrue(state){
            state.pending = true;

        },
        PendingFalse(state){
            state.pending = false;
        },
        addUsers(state,action){
            state.users = action.payload
        },
        loginError(state,action){
            state.loggedIn = false;
            state.err = action.payload
            state.pending = false;
        },
        logOut(state,action){
            state.user = null;
            state.loggedIn = false;
            state.err = null
            state.pending = false;
        },
        logOutError(state,action){
            state.user = state.user;
            state.loggedIn = true;
            state.err = action.payload
            state.pending = false;
        },
        register(state,action){
            state.user = action.payload;
            state.loggedIn = true;
            state.err = null
        },
        fetchLoad(state,action){
            state.loadProject = true
        },
        fetchPro(state,action){
            state.projects = action.payload
            state.proError = null
        },
        fetchError(state,action){
            state.projects = null
            state.proError = action.payload
        },
        fetchLoadFalse(state,action){
            state.loadProject = false
        },
        singleProjectFetch(state,action){
            state.singlePro = action.payload
            state.singleError = null
        },
        singleProjectFetchError(state,action){
            state.singlePro = null
            state.singleError= action.payload
        },
        singleFetching(state){
            state.singleFetch = true
        },
        singleFetchingDone(state){
            state.singleFetch = false
        },
    }
})



export const authSliceAction = authSlice.actions


const store = configureStore({
    reducer:{auth:authSlice.reducer}
})


export default store;