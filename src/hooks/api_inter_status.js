import axios from "axios";

const GetDischargeById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/discharge/getdischagebyid/${id}`)
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error }
    }
}

const AddInterventionStatus = async (data) => {
    try {
        const response = await axios.post(`http://localhost:8080/interventionStatus/addInterventionStatus`, data);
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export { AddInterventionStatus, GetDischargeById }