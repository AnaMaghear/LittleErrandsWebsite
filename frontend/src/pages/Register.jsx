import {useState, useEffect, } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    fullname : '',
    username : '',
    email: '',
    phoneNumber: '',
    password: '',
    password2: ''
  })

  const {fullname, username, email, phoneNumber, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth) 


useEffect (() =>{
  if(isSuccess || user){
    navigate('/')
  }

  if(isError){
    toast.error(message)
  }

  dispatch(reset)
}, [user, isError, isSuccess, message, navigate, dispatch])

const onChange = (e) => {
    setFormData((prevState) => ({
    ...prevState, 
    [e.target.name]: e.target.value,
  }))
}

const onSubmit = (e) => {
  e.preventDefault()

  if(password !== password2){
    toast.error('Passwords do not match')
  }else{
    const userData = {
      fullname, 
      username,
      email,
      phoneNumber,
      password
    }
    dispatch(register(userData))
  }
}

if(isLoading){
  return <Spinner />
}

  return (
    <>
      <section className="heading" >
        <h1>
          <FaUser /> Register
        </h1>
        <p> Please create an account</p>
      </section>

      <section className = "form">
        <form onSubmit = {onSubmit}>
          <div className="form-group">
            <input
              type = "text" 
              className = "form-control" 
              id =  "fullname" 
              name = 'fullname' 
              value = {fullname} 
              placeholder = "Enter your fullname"
              onChange = {onChange}
            /> 
          </div>
          <div className="form-group">
            <input
              type = "text" 
              className = "form-control" 
              id =  "username" 
              name = 'username' 
              value = {username} 
              placeholder = "Enter your username"
              onChange = {onChange}
            /> 
          </div>
          <div className="form-group">
            <input
              type = "email" 
              className = "form-control" 
              id =  "email" 
              name = 'email' 
              value = {email} 
              placeholder = "Enter your email"
              onChange = {onChange}
            /> 
          </div>
          <div className="form-group">
            <input
              type = "tel" 
              className = "form-control" 
              id =  "phoneNumber" 
              name = 'phoneNumber' 
              value = {phoneNumber} 
              placeholder = "Enter your phoneNumber"
              onChange = {onChange}
            /> 
          </div>
          <div className="form-group">
            <input
              type = "password" 
              className = "form-control" 
              id =  "password" 
              name = 'password' 
              value = {password} 
              placeholder = "Enter your password"
              onChange = {onChange}
            /> 
          </div>
          <div className="form-group">
            <input
              type = "password" 
              className = "form-control" 
              id =  "password2" 
              name = 'password2' 
              value = {password2} 
              placeholder = "Confirm password "
              onChange = {onChange}
            /> 
          </div>
          <div>
            <div className = "form-group">
              <button type = "submit" className='btn btn-block'>Submit </button>
            </div>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default Register