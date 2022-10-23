import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify'
import { getErrandById, reset } from '../features/errand/errandSlice'

function Errand() {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { errands, isLoading, isError, message } = useSelector((state) => state.errand)

  useEffect(() => {
    if (!user) {
        navigate('/login')
    } else {
        dispatch(getErrandById(id))
    }

    if (isError) {
        toast.error(message)
    } 

  }, [user, navigate, isError, message, dispatch])

  return (
    <div>{errands.title}</div>
  )
}

export default Errand