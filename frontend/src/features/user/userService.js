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

const updateUser = async (updateUserData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}`,updateUserData, config)

    return response.data
}


const userService = {
    getUserById,
    updateUser
}

export default userService