import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {toast} from 'react-toastify'
import userService from "../features/user/userService";
import Spinner from "../components/Spinner"

const Profile = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    fullname : '',
    username : '',
    email: '',
    phoneNumber: '',
    password: '',
    password2: ''
  })

  const {fullname, username, email, phoneNumber, password, password2} = formData
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }else{
        const loadUser = async () => {
          setRefresh(false)
          setFormData({
            fullname : '',
            username : '',
            email: '',
            phoneNumber: '',
            password: '',
            password2: ''
          })
          await userService
            .getUserById(user._id, user.token)
            .then(usr => { 
              setFormData((prevState) => ({
                ...prevState,
                fullname: usr.fullname,
                username: usr.username,
                email: usr.email,
                phoneNumber: usr.phoneNumber}))
              setIsLoading(false)
            })
        }

        loadUser()
    }
  }, [user, navigate, refresh])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onUpdate = async (e) => {
    e.preventDefault()

    if(password !== password2){
      toast.error('Passwords do not match')
    }
    else{
      await userService.updateUser(formData, user.token)
        .then(() => { setIsLoading(true); setRefresh(true)})
    }
  }

  const loadContent = () => {
      return (
        <>
          <section className = "form">
            <form onSubmit = {onUpdate}>
              <div className="form-group">
                <label>Fullname</label>
                <input
                  type = "text" 
                  className = "form-control" 
                  id =  "fullname" 
                  name = 'fullname' 
                  value = { fullname }
                  placeholder = "Enter your fullname"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type = "text" 
                  className = "form-control" 
                  id =  "username" 
                  name = 'username' 
                  value = { username } 
                  placeholder = "Enter your username"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type = "text" 
                  className = "form-control" 
                  id =  "email" 
                  name = 'email' 
                  value = { email } 
                  placeholder = "Enter your email"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type = "tel" 
                  className = "form-control" 
                  id =  "phone" 
                  name = 'phone' 
                  value = { phoneNumber } 
                  placeholder = "Enter your phone"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type = "password" 
                  className = "form-control" 
                  id =  "password" 
                  name = 'password' 
                  value = {password} 
                  placeholder = "Leave empty if you do not want to change password"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input
                  type = "password" 
                  className = "form-control" 
                  id =  "password2" 
                  name = 'password2' 
                  value = {password2} 
                  placeholder = "Leave empty if you do not want to change password"
                  onChange = {onChange}
                /> 
              </div>
            </form>
          </section>
        </>
      )
  }

  const gotoMyErrands = () => {
    navigate('/myErrands')
  }

  const gotoMyEnrollments = () => {
    navigate('/myEnrollments')
  }

  const loadButtons = () => {
    return(
      <div className="profile-buttons-container">
        <button className='btn' onClick={onUpdate}>Update</button>
        <button className='btn' onClick={gotoMyEnrollments}>Enrollments</button>
        <button className='btn' onClick={gotoMyErrands}>Errands</button>
      </div>
    )
  }

  const load = () => {
    if (isLoading) {
      return (
        <Spinner />
      )
    } else {
      return (
        <div>
          <Card>
            <CardContent>
            <Typography variant="h3" component="div" fontFamily={"Times New Roman"}>
              Hello, { user.fullname }
            </Typography>
            </CardContent>
            <CardContent>
              { loadContent() }
              { loadButtons() }
            </CardContent> 
          </Card>
        </div>
      )
    }
  }

  return (
    <>
        { load() }
    </>
  )
}

export default Profile