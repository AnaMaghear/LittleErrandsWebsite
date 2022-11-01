import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register' 
import CreateErrand from './pages/CreateErrand'
import Errand from './pages/Errand'
import MyErrandsList from './pages/MyErrandsList'
import MyEnrollmentsList from './pages/MyEnrollmentsList'
import { Helmet } from 'react-helmet'

const TITLE = "LittleErrands"

function App() {
  return (
    <>
      <Helmet>
          <title>{TITLE}</title>
      </Helmet>    
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path = '/' element = {<Home />} />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/register' element = {<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/createErrand' element={<CreateErrand />} />
            <Route path='/errand/:id' element={<Errand />} />
            <Route path='/myErrands' element={<MyErrandsList />} />
            <Route path='/myEnrollments' element={<MyEnrollmentsList />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
