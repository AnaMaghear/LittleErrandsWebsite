import React from 'react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from 'react'
import errandService from '../features/errand/errandService'
import ErrandItem from '../components/ErrandItem'
import ErrandSkeleton from '../components/ErrandSkeleton'

function MyErrandsList() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [errands, setErrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
       navigate('/login')
    } else {
        const loadErrands = async () => {
            await errandService
                .getErrandsByUser(user.token)
                .then(ernds => {setErrands(ernds); setIsLoading(false)})
        }

        loadErrands()
    }
  }, [user, navigate])

  const loadContent = () => {
    return (
        <div className="errands-list">
            { 
              errands.length > 0 ? 
                errands.map((e) => <ErrandItem key={e._id} errand={e} />) : 
                <h3>There are no errands available</h3>
            }
        </div>
      )
  }

  const loadSkeleton = () => {
    return (
      <div>
        <ErrandSkeleton />
      </div>
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
    <>{ load() }</>
  )
}

export default MyErrandsList