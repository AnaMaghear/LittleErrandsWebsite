import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux"
import { useState } from 'react';
import userService from '../features/user/userService';
import { useNavigate } from 'react-router-dom';
import errandService from '../features/errand/errandService';
import { convertConfirmationStatus } from '../utils/enumConvert';

function SolverConfirmationItem({confirmation}) {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [errand, setErrand] = useState('')
  const [creator, setCreator] = useState('')

  useEffect(() => {
    if (!user) {
        navigate('/login')
    } else {
        const loadErrand = async () => {
            await errandService
                .getErrandById(confirmation.errand, user.token)
                .then(async ernd => {
                    setErrand(ernd)
                    await userService
                        .getUserById(ernd.user, user.token)
                        .then(usr => setCreator(usr))
                })
        }

        loadErrand()
    }
  }, [user, navigate])

  const gotoErrand = () => {
    navigate(`/errand/${errand._id}`)
  }
  
  return (
    <div className='confirmation-card-container'>
      <Card onClick={gotoErrand}>
        <CardContent className='confirmation-content'>
          <div>
            <Typography variant="h5" component="div">
                Title: {errand.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                by {creator.username}
            </Typography>
            <Typography variant="body2">
                Status: { convertConfirmationStatus(confirmation.confirmation)}
            </Typography>   
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SolverConfirmationItem