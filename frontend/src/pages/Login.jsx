import {useState, useEffect } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
function Login() {
  const [formData, setFormData] = useState({
    username : '',
    password1: '',
  })

  const {username, password1} = formData

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
          <FaSignInAlt /> Login
        </h1>
        <p> Please sign in to your account</p>
      </selection>

      <section className = "form">
        <form onSubmit = {onSubmit}>
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
              type = "password" 
              className = "form-control" 
              id =  "password1" 
              name = 'password1' 
              value = {password1} 
              placeholder = "Enter your password"
              onChange = {onChange}
            /> 
          </div>
          
          <div classNmae = "form-group">
              <button type = "submit" className='btn btn-block'>Submit </button>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default Login