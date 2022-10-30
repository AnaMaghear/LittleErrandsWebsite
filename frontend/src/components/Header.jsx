import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const gotoProfile = () => {
    navigate('/profile')
  }

  const gotoCreateErrand = () => {
    navigate('/createErrand')
  }

  const gotoErrands = () => {
    navigate('/')
  }

  return (
    <header className='header'>
        <div className='logo-section'>
            <div className='logo' onClick={gotoErrands}>
                Errands
            </div>
            {
                user ? (
                    <button className="btn" onClick={gotoCreateErrand}>Create Errand</button>
                ) : (
                    <></>
                )
            }
            
        </div>
        <ul>
            {user ? (
                <>
                    <li>
                        <button className='btn' onClick={gotoProfile}>
                            <FaUser/> Profile
                        </button>
                    </li>
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt/> Logout
                        </button>
                    </li>
                </>
            ) : (
              <>
                    <li>
                        <Link to= '/login'>
                            <FaSignInAlt/>Login
                        </Link>
                    </li>
                   
                    <li>
                        <Link to= '/register'>
                            <FaUser/>Register
                        </Link>
                    </li>

            </> )}


        </ul>
    </header>
  )
}

export default Header