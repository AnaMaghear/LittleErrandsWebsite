import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllErrands, reset } from "../features/errand/errandSlice"
import Spinner from "../components/Spinner"
import {toast} from 'react-toastify'
import ErrandItem from '../components/ErrandItem'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { errands, isLoading, isError, message } = useSelector((state) => state.errand)

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

  const loadErrands = () => {
    if (isLoading) {
      return (<Spinner />)
    } else if (errands.length === 0) {
      return (<h3>No errands in your location</h3>)
    } else {
      return (
        <div className="errands-list">
            { 
              errands.map((errand) => (
                <ErrandItem key={errand._id} errand={errand} />
              )) 
            }
        </div>
      )
    }
  }

  return (
    <>
      <div className="errands-list-container">
        { loadErrands() }
      </div>
    </>
  )
}

export default Home