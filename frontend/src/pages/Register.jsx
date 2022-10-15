import {useState, useEffect, } from 'react'
import {FaUser} from 'react-icons/fa'
function Register() {
  const [formData, setFormData] = useState({
    fullname : '',
    username : '',
    email: '',
    phoneNumber: '',
    password1: '',
    password2: ''
  })

  const {fullname, username, email, phoneNumber, password1, password2} = formData


const onChange = (e) => {
    setFormData((prevState) => ({
    ...prevState, 
    [e.target.name]: e.target.value,
  }))
}

const onSubmit = (e) => {
  e.preventDefault()
}

  return (
    <>
      <selection className="heading" >
        <h1>
          <FaUser /> Register
        </h1>
        <p> Please create an account</p>
      </selection>

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
              id =  "password1" 
              name = 'password1' 
              value = {password1} 
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
            <div classNmae = "form-group">
              <button type = "submit" className='btn btn-block'>Submit </button>
            </div>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default Register