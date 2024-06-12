import axios from "axios";

const SearchByImei = async (imei) => {
    try {
        const response = await axios.get(`http://localhost:8080/device/getDeviceById/${imei}`);
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, data: 'Device not found or an error occurred.' }
    }
}

const DetailfichSav = async (imei) => {
    try {
        const response = await axios.get(`http://localhost:8080/intervention/getInterventionById/${imei}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, data: error.message };
    }
}

const updateFich = async (data) => {
    try {
        const response = await axios.put(`http://localhost:8080/intervention/updateInterventionById/${data.id}`, data);
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, data: 'Device not found or an error occurred.' }
    }
}

const Searchfichsav = async (opt, val) => {
    let uri = `http://localhost:8080/intervention/getInterventionByImei/${val}`
    if (opt == "CIN") {
        uri = `http://localhost:8080/intervention/getInterventionByClientCin/${val}`
    } else if (opt == "NFICH") {
        uri = `http://localhost:8080/intervention/getInterventionById/${val}`
    }

    try {
        const response = await axios.get(uri);
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, data: 'Device not found or an error occurred.' }
    }
}

const AddIntervention = async (data) => {
    const response = await axios.get(`http://localhost:8080/device/getDeviceById/${data.imei}`);
    return { success: true, data }
}

export { SearchByImei, AddIntervention, Searchfichsav, DetailfichSav, updateFich }