import React from 'react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from 'react'
import confirmationService from '../features/confirmation/confirmationService'
import ConfirmationItem from '../components/ConfirmationItem'
import SolverConfirmationItem from '../components/SolverConfirmationItem'
import EnrollmentsSkeleton from '../components/EnrollmentsSkeleton'

function MyEnrollmentsList() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [confirmations, setConfirmations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
       navigate('/login')
    } else {
        const loadConfirmations = async () => {
            await confirmationService
              .getConfirmationsBySolver(user.token)
              .then(cnfs => {
              setConfirmations(cnfs)
              setIsLoading(false)
              })
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

  
  const loadSkeleton = () => {
    return(
      <>
        <EnrollmentsSkeleton />
      </>
    )
  }

  const load = () => {
    if (isLoading) {
      return loadSkeleton()
    } else {
      return loadContent()
    }
  }

  return (
    <div>
      {load()}
    </div>
  )
}

export default MyEnrollmentsList