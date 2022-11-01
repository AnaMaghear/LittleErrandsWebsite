import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ErrandItem from '../components/ErrandItem'
import { useState } from "react"
import ErrandStatus from "../enums/errandStatusEnum"
import errandService from "../features/errand/errandService"
import ErrandSkeleton from "../components/ErrandSkeleton"

const Home = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const [location, setLocation] = useState('')
  const [errands, setErrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const handleInput = (e) => {
    setLocation(e.target.value)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      setErrands([])
      const loadErrands = async () => {
        await errandService.getAllErrands(user.token)
          .then((ernds) => {         
            setErrands(ernds);           
            setIsLoading(false)
          })
      }
      
      loadErrands()
    }
  }, [user, navigate])

  let filteredErrands
  const filterErrand = () => {
    return errands.length > 0 ? errands
      .filter(e => 
        user &&
        e.location && 
        e.location.toString().includes(location.toLowerCase()) && 
        e.user !== user._id &&
        e.status === ErrandStatus.New
        ) : errands
  }

  const loadErrands = () => {
      filteredErrands = filterErrand()
      return (
        <div className="errands-list">
              { filteredErrands.length > 0 ? 
                filteredErrands.map((e) => (<ErrandItem key={e._id} errand={e} />)) : 
                (<h3>There are no errands available</h3>) 
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
      return loadErrands()
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
        { load() }
      </div>
    </>
  )
}

export default Home