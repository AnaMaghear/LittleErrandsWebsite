import React from 'react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from 'react'
import confirmationService from '../features/confirmation/confirmationService'
import ConfirmationItem from '../components/ConfirmationItem'
import SolverConfirmationItem from '../components/SolverConfirmationItem'

function MyEnrollmentsList() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [confirmations, setConfirmations] = useState([])

  useEffect(() => {
    if (!user) {
       navigate('/login')
    } else {
        const loadConfirmations = async () => {
            await confirmationService
              .getConfirmationsBySolver(user.token)
              .then(cnfs => setConfirmations(cnfs))
        }

        loadConfirmations()
    }
  }, [user, navigate])

  const loadContent = () => {
    return (
      confirmations.length > 0 ? 
        confirmations.map(c => <SolverConfirmationItem key={c._id} confirmation={c} />) :
        <h2>No enrollments</h2>
    )
  }

  return (
    <div>
      {loadContent()}
    </div>
  )
}

export default MyEnrollmentsList