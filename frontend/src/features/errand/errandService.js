import axios from 'axios'

const API_URL = '/api/errands/'

const createErrand = async (errandData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.post(`${API_URL}me`, errandData, config)

    return response.data
}

const getAllErrands = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}`, config)

    return response.data
}

const errandService = {
    createErrand,
    getAllErrands
}

export default errandService