import React from 'react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from 'react'
import errandService from '../features/errand/errandService'
import ErrandItem from '../components/ErrandItem'

function MyErrandsList() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [errands, setErrands] = useState([])

  useEffect(() => {
    if (!user) {
       navigate('/login')
    } else {
        const loadErrands = async () => {
            await errandService
                .getErrandsByUser(user.token)
                .then(ernds => setErrands(ernds))
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

  return (
    <>{ loadContent() }</>
  )
}

export default MyErrandsList