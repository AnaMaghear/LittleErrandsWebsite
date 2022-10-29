import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Profile = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    
  }, [user, navigate])

  return (
    <>
      Hello, { user.fullname }
    </>
  )
}

export default Profile