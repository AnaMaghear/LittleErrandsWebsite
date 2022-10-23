import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllErrands } from "../features/errand/errandSlice"
import Spinner from "../components/Spinner"
import {toast} from 'react-toastify'
import ErrandItem from '../components/ErrandItem'
import { useState } from "react"
import ErrandStatus from "../enums/errandStatusEnum"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { errands, isLoading, isError, message } = useSelector((state) => state.errand)

  const [location, setLocation] = useState('')
  const handleInput = (e) => {
    setLocation(e.target.value)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getAllErrands())
    }

    if (isError) {
      toast.error(message)
    }    
  }, [user, navigate, isError, message, dispatch])

  let filteredErrands
  const filterErrand = () => {
    return errands
      .filter(e => 
        e.location && 
        e.location.toString().includes(location.toLowerCase()) && 
        e.user !== user._id &&
        e.status === ErrandStatus.New
        )
  }

  const loadErrands = () => {
    if (isLoading) {
      return (<Spinner />)
    } else {
      filteredErrands = filterErrand()
      return (
        <div className="errands-list">
            { 
              filteredErrands.length > 0 ? 
                filteredErrands.map((e) => <ErrandItem key={e._id} errand={e} />) : 
                <h3>There are no errands available</h3>
            }
        </div>
      )
    }
  }

  return (
    <>
      <input 
        className="search"
        type="text"
        name="location"
        id="location"
        placeholder = "Your city..."
        value={location}
        onChange={handleInput} />
      <div className="errands-list-container">
        { loadErrands() }
      </div>
    </>
  )
}

export default Home