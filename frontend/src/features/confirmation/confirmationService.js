import axios from 'axios'

const API_URL = '/api/confirmations/'

const createConfirmation = async (confirmationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.post(`${API_URL}`, confirmationData, config)

    return response.data    
}

const getConfirmationByErrandAndSolver = async (confirmationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.get(`${API_URL}forSolver/${confirmationData.errandId}`, config)

    return response.data 
}

const deleteConfirmation = async (confirmationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.delete(`${API_URL}${confirmationData}`, config)

    return response.data
}

const getConfirmationsByErrand = async (errandId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.get(`${API_URL}${errandId}`, config)

    return response.data
}

const confirmationService = {
    createConfirmation,
    getConfirmationByErrandAndSolver,
    deleteConfirmation,
    getConfirmationsByErrand
}

export default confirmationService