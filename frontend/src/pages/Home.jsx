import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ErrandItem from '../components/ErrandItem'
import { useState } from "react"
import ErrandStatus from "../enums/errandStatusEnum"
import errandService from "../features/errand/errandService"

const Home = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const [location, setLocation] = useState('')
  const [errands, setErrands] = useState([])
  const handleInput = (e) => {
    setLocation(e.target.value)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      setErrands([])

      const loadErrands = async () => {
        let loadedErrands = await errandService.getAllErrands(user.token)
        setErrands(loadedErrands)
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
    console.log(filteredErrands.length);
    return (
      <div className="errands-list">
          { 
            filteredErrands.length > 0 ? 
              filteredErrands.map((e) => (<ErrandItem key={e._id} errand={e} />)) : 
              (<h3>There are no errands available</h3>)
          }
      </div>
    )
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