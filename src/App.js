import './App.css'
import {BrowserRouter as Router,Routes,Route, useNavigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './pages/Create'
import Project from './pages/Project'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';
import OnlineUsers from './components/OnlineUsers';


function App() {
  const loggedIn = useSelector(state=> state.auth.loggedIn)
  const user = useSelector(state=> state.auth.user)
  console.log(loggedIn)
  // const navigate = useNavigate()

  return (
    <div className="App">
      <ToastContainer />
    <Router>
       {user && <Sidebar />}
       {/* <OnlineUsers /> */}
      <div className="container">
        <Navbar />
    <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          {loggedIn && <Route path="/projects/:id" element={<Project />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      {user && <OnlineUsers />}
    </Router>
    </div>
  );
}

export default App
