import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import errandService from '../features/errand/errandService'
import userService from '../features/user/userService'
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import confirmationService from '../features/confirmation/confirmationService'
import {toast} from 'react-toastify'

function Errand() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [errand, setErrand] = useState({
    user: '',
    title: '',
    description: '',
    location: '',
    reward: ''
  })
  const [creator, setCreator] = useState({
    fullname: '',
    username: '',
    email: '',
    phone: ''
  })

  const [isLoading, setIsLoading] = useState(true)
  const [solverConfirmation, setSolverConfirmation] = useState([])
  const [errandConfirmations, setErrandConfirmations] = useState([]) //todo do not forget!!!!
  const [refresh, setRefresh] = useState(false)

  const [errandUpdateData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    reward: ''
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      const load = async () => {
        setRefresh(false)
        await errandService
          .getErrandById(id, user.token)
          .then(async (ernd) => {
            setErrand(ernd)
            setFormData({
              title: ernd.title,
              description: ernd.description,
              location: ernd.location,
              reward: ernd.reward
            })
            await confirmationService
              .getConfirmationsByErrand(ernd._id, user.token)
              .then(confirmations => setErrandConfirmations(confirmations))
              .catch(() => setErrandConfirmations([]))
            await confirmationService
              .getConfirmationByErrandAndSolver({ errandId: ernd._id }, user.token)
              .then(cnf => setSolverConfirmation(cnf))
            await userService
              .getUserById(ernd.user, user.token)
              .then(crtr => {
                setCreator(crtr)
                setIsLoading(false)
              })
        })
      }

      load()
    }
  }, [user, navigate, refresh])

  const createConfirmation = async () => {
    await confirmationService
      .createConfirmation({ errandId: errand._id }, user.token)
      .then(() => setRefresh(true))
      // .catch((err) => { toast.error(err.response.data.message)})
}

  const deleteConfirmation = async () => {
    await confirmationService
      .deleteConfirmation(solverConfirmation._id, user.token)
      .then(() => setRefresh(true))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onUpdate = async (e) => {
    e.preventDefault()
    await errandService.updateErrand(errandUpdateData, errand._id, user.token)
  }

  const onDelete = async () => {
    await errandService.deleteErrand(errand._id, user.token)
    navigate('/myErrands')
  }

  const loadContent = () => {
    if (errand.user === user._id) {
      return (
        <>
          <section className = "form">
            <form onSubmit = {onUpdate}>
              <div className="form-group">
              <label>Title</label>
                <input
                  type = "text" 
                  className = "form-control" 
                  id =  "title" 
                  name = 'title' 
                  value = {errandUpdateData.title} 
                  placeholder = "Enter title"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type = "text" 
                  className = "form-control" 
                  id =  "description" 
                  name = 'description' 
                  value = {errandUpdateData.description} 
                  placeholder = "Enter description"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type = "text" 
                  className = "form-control" 
                  id =  "location" 
                  name = 'location' 
                  value = {errandUpdateData.location} 
                  placeholder = "Enter location"
                  onChange = {onChange}
                /> 
              </div>
              <div className="form-group">
                <label>Reward</label>
                <input
                  type = "number" 
                  className = "form-control" 
                  id =  "reward" 
                  name = 'reward' 
                  value = {errandUpdateData.reward} 
                  placeholder = "Enter reward"
                  onChange = {onChange}
                /> 
              </div>
            </form>
          </section>
        </>
      )
    } else {
      return (
        <>
          <Typography variant="h5" component="div">
            { errand.title }
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            by { creator.fullname }
          </Typography>
          <Typography variant="body2">
            { errand.description }
          </Typography>
        </>
      )
    }
  }

  const loadButtons = () => {
    if (errand.user === user._id) {
      return (
        <div className='errand-buttons-container'> 
          <button className='btn' onClick={onUpdate}>Update</button>
          <button className='btn' onClick={onDelete}>Remove</button>
        </div>
      )
    } else {
      return (
        solverConfirmation.length === 0 ? 
        (<button className='btn' onClick={createConfirmation}>Enroll</button>) : 
        (<button className='btn' onClick={deleteConfirmation}>Revoke</button>)
      )
    }
  }

  const loadConfirmations = () => {
    return(
      errandConfirmations.map((e) => <h2 key={e._id} >{e.confirmation}</h2>)
    )
  }

  const loading = () => {
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          <Card>
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
      { loading() }
      { errand.user === user._id ? loadConfirmations() : <></> }
    </>
  )
}

export default Errand