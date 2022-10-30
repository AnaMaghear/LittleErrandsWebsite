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

const getErrandById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}${id}`, config)

    return response.data
}

const updateErrand = async (errandUpdateData, errandId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}${errandId}`, errandUpdateData, config)

    return response.data
}

const deleteErrand = async (errandId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}${errandId}`, config)

    return response.data
}

const errandService = {
    createErrand,
    getAllErrands,
    getErrandById,
    updateErrand,
    deleteErrand
}

export default errandService