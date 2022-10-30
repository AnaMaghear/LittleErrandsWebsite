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
              <Typography variant="h5" component="div">
                { errand.title }
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                by { creator.fullname }
              </Typography>
              <Typography variant="body2">
                { errand.description }
              </Typography>
                { 
                  solverConfirmation.length === 0 ? 
                    (<button className='btn' onClick={createConfirmation}>Enroll</button>) : 
                    (<button className='btn' onClick={deleteConfirmation}>Revoke</button>)
                }
            </CardContent> 
          </Card>
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