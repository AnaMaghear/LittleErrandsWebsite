import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../features/user/userSlice';
import { useState } from 'react';
import userService from '../features/user/userService';
import { convertErrandStatus } from '../utils/enumConvert';

function ErrandItem({errand}) {
  const navigate = useNavigate()

  const gotoErrand = () => {
    navigate(`/errand/${errand._id}`)
  }

  const { user } = useSelector((state) => state.auth)
  const [creator, setCreator] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
  } else {
      const loadUser = async () => {
        let loadedUser = await userService.getUserById(errand.user, user.token)
        setCreator(loadedUser.username)
      }

      loadUser()
  }
  }, [user, navigate])

  return (
    <div className='card'>
      <Card id="cardcolor" onClick={gotoErrand}>
        <CardContent>
          <Typography variant="h5" component="div">
          {errand.title.length > 25 ? errand.title.slice(0, 23) + "..." : errand.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            by { creator }
          </Typography>
          <Typography variant="body2">
            {errand.description.length > 100 ? errand.description.slice(0, 98) + "..." : errand.description}
          </Typography>
          <Typography variant="body2">
            Status: {convertErrandStatus(errand.status)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ErrandItem