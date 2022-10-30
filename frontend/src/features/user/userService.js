import axios from 'axios'

const API_URL = '/api/users/'

const getUserById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}${id}`, config)

    return response.data
}

const userService = {
    getUserById
}

export default userService