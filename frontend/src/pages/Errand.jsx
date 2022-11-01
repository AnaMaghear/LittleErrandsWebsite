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
import ConfirmationItem from '../components/ConfirmationItem'
import ConfirmationStatus from '../enums/confirmationStatusEnum'
import ErrandStatus from '../enums/errandStatusEnum'
import EnrollmentsSkeleton from '../components/EnrollmentsSkeleton'

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
  const [errandConfirmations, setErrandConfirmations] = useState([])
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
              })
          })
          .then(() => setIsLoading(false))
      }

      load()
    }
  }, [user, navigate, refresh])

  const createConfirmation = async () => {
    await confirmationService
      .createConfirmation({ errandId: errand._id }, user.token)
      .then(() => { setIsLoading(true); setRefresh(true)})
  }

  const deleteConfirmation = async () => {
    await confirmationService
      .deleteConfirmation(solverConfirmation._id, user.token)
      .then(() => { setIsLoading(true); setRefresh(true)})
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const updateConfirmations = async () => {
    await confirmationService
      .getConfirmationsByErrand(errand._id, user.token)
      .then(async ec => {
        ec.filter(c => c.confirmation === ConfirmationStatus.Pending)
          .map(async c => 
              await confirmationService
                  .updateConfirmation(c._id, {confirmation: ConfirmationStatus.Declined}, user.token))

          await errandService
            .updateErrand({status: ErrandStatus.InProgress}, errand._id, user.token)
      })
      .then(() => setRefresh(true)) 
  }

  const onUpdate = async (e) => {
    e.preventDefault()
    await errandService.updateErrand(errandUpdateData, errand._id, user.token)
  }

  const onDelete = async () => {
    await errandService.deleteErrand(errand._id, user.token)
    navigate('/myErrands')
  }

  const onDone = async () => {
    await errandService.updateErrand({status: ErrandStatus.Done}, errand._id, user.token)
      .then(() => setRefresh(true))
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

  const loadCreatorButtons = () => {
    if(errand.status === ErrandStatus.New){
      return (
        <div className='errand-buttons-container'> 
          <button className='btn' onClick={onUpdate}>Update</button>
          <button className='btn' onClick={onDelete}>Remove</button>
        </div>
      )
    }else if(errand.status === ErrandStatus.InProgress) {
      return (
        <div className='errand-buttons-container'> 
          <button className='btn' onClick={onDone}>Done</button>
        </div>
      )
    }
    else {
      return (
        <p>This errand is done</p>
      )
    }
  }

  const loadButtons = () => {
    if (errand.user === user._id) {
      return loadCreatorButtons() 
    } else if (solverConfirmation.length === 0) {
        return (<button className='btn' onClick={createConfirmation}>Enroll</button>)
    } else if (solverConfirmation.confirmation === ConfirmationStatus.Pending) {
        return (<button className='btn' onClick={deleteConfirmation}>Revoke</button>)
    } else if (solverConfirmation.confirmation === ConfirmationStatus.Declined) {
      return (<p>You have been rejected and cannot enroll to this errand again</p>)
    } else {
      return (<p>You have been accepted</p>)
    }
  }

  const loadConfirmations = () => {
    return(
      errandConfirmations
        .filter(c => c.confirmation === ConfirmationStatus.Pending || c.confirmation === ConfirmationStatus.Accepted)
        .map((c) => <ConfirmationItem key={c._id} confirmation={c} setRefresh={setRefresh} updateConfirmations={updateConfirmations} />)
    )
  }

  const loading = () => {
    if (isLoading) {
      return (
        <div>
          <EnrollmentsSkeleton />
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
          { errand.user === user._id ? loadConfirmations() : <></> }
        </div>
      )
    }
  }

  return (
    <>
      { loading() }
    </>
  )
}

export default Errand