import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux"
import { useState } from 'react';
import userService from '../features/user/userService';
import { useNavigate } from 'react-router-dom';
import {FaCheckSquare, FaWindowClose} from 'react-icons/fa'
import confirmationService from '../features/confirmation/confirmationService';
import ConfirmationStatus from '../enums/confirmationStatusEnum';
import { convertConfirmationStatus } from '../utils/enumConvert';

function ConfirmationItem({confirmation, setRefresh, updateConfirmations}) {
  const navigate = useNavigate()
  
  const { user } = useSelector((state) => state.auth)
  const [solver, setSolver] = useState('')

  useEffect(() => {
    if (!user) {
        navigate('/login')
    } else {
        const loadSolver = async () => {
            await userService
                .getUserById(confirmation.solver, user.token)
                .then(slvr => setSolver(slvr))
        }

        loadSolver()
    }
  }, [user, navigate])

  const onAccept = async () => {
    await confirmationService
        .updateConfirmation(confirmation._id, {confirmation: ConfirmationStatus.Accepted}, user.token)
        .then(() => updateConfirmations())
  }

  const onReject = async () => {
    await confirmationService
        .updateConfirmation(confirmation._id, {confirmation: ConfirmationStatus.Declined}, user.token)
        .then(() => setRefresh(true))
  }

  return (
    <div className='confirmation-card-container'>
        <Card>
        <CardContent className='confirmation-content'>
          <div>
            <Typography variant="h5" component="div">
                Fullname: { solver.fullname }
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Username: { solver.username }
            </Typography>
            <Typography variant="body2">
                Phone number: { solver.phoneNumber }
            </Typography>
            <Typography variant="body2">
                Status: { convertConfirmationStatus(confirmation.confirmation)}
            </Typography>   
          </div>
          {
            confirmation.confirmation !== ConfirmationStatus.Accepted ? (
                <div className='confirmation-buttons-container'>
                    <button onClick={onAccept} className='confirmation-button'><FaCheckSquare id='accept' /></button>
                    <button onClick={onReject} className='confirmation-button'><FaWindowClose id='reject' /></button>
                </div>
            ) : <></>
          }
          
        </CardContent>
      </Card>
    </div>
  )
}

export default ConfirmationItem