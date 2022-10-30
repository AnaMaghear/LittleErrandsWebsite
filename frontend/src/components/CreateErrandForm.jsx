import { useState } from 'react'
import { createErrand } from '../features/errand/errandSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'


function CreateErrandForm() {
  
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { errands, isLoading, isError, message } = useSelector(
    (state) => state.errand
  )
  
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    }

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, isError, message, dispatch])

  // if (isLoading) {
  //   return <Spinner />
  // }

  const [errandData, setErrand] = useState({
    title: '',
    description: '',
    location: '',
    reward: ''
  })

  

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createErrand(errandData))
    setErrand({
        title: '',
        description: '',
        location: '',
        reward: ''
    })
  }

  const handleChange = (event) => {
    setErrand({ ...errandData, [event.target.name]: event.target.value})
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={errandData.title}
            onChange={handleChange}
          />
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            value={errandData.description}
            onChange={handleChange}
          />
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            name='location'
            id='location'
            value={errandData.location}
            onChange={handleChange}
          />
          <label htmlFor='reward'>Reward</label>
          <input
            type='text'
            name='reward'
            id='reward'
            value={errandData.reward}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Errand
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateErrandForm