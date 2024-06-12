import { useState } from "react";
import axios from 'axios';
import Layout from "../layout";
import SearchResult from "./SearchResult";
import FileCard from "./FileCard";
import FicheIntervention from "./FicheIntervention";
// import { SearchByImei } from "../../hooks/api_search"; // No longer needed as we use Axios directly

export default function RecherchePage() {
    const [deviceId, setDeviceId] = useState('');
    const [deviceData, setDeviceData] = useState(null);
    const [error, setError] = useState(null);


    const [currentView, setCurrentView] = useState(0)
    const [searchResultData, setSearchResultData] = useState({})
    const [clientInfo, setClientInfo] = useState({
        nom: "",
        prenom: "",
        numCin: "",
        numTel1: "",
        numTel2: ""
    });
    const [interventionData, setInterventionData] = useState({
        description: "",
        batterie: "",
        etatTerminal: "",
        terminalDePret: "",
        workflow: "",

    });
    const [saveResponseData,setSaveResponseData] = useState({})


    const search = async (e) => {
        e.preventDefault()
        const v = Object.fromEntries(new FormData(e.currentTarget))
        const imei = v.imei.toString()
        if (imei === "") return
        setCurrentView(-1)
        try {
            const response = await axios.get(`http://localhost:8080/device/getDeviceById/${imei}`);
            setSearchResultData(response.data);
            setCurrentView(1);
        } catch (error) {
            alert('Device not found or an error occurred.');
            setCurrentView(0);
        }
    }

    const createFile = () => setCurrentView(2)
    const onCancelFile = () => setCurrentView(1)

    const optionMapper = (v) => {
        const arr = []
        for (const k in v)
            if (v[k].innerText)
                arr.push(v[k].innerText ?? "")
        return arr 
    }
    const saveFile = async (e) => {
        e.preventDefault();

        const accessoires = optionMapper(e.target["10"].options);
        const pannes = optionMapper(e.target["12"].options);
      
        try {
            // Prepare the client data to be sent
            const clientData = {

                lastName: clientInfo.nom,
                firstName: clientInfo.prenom,
                cin: clientInfo.numCin,
                phoneNumber1: clientInfo.numTel1,
                phoneNumber2: clientInfo.numTel2,
                email: clientInfo.email
            };

            // Send the POST request
            const response = await axios.post('http://localhost:8080/client/addClient', clientData);
            const interventionDataToSend = {
                imei: searchResultData.imei, // Assuming you have this data in searchResultData
                batterie: interventionData.batterie,
                etatTerminal: interventionData.etatTerminal,
                terminalDePret: interventionData.terminalDePret,
                workflow: interventionData.workflow,
                description: interventionData.description,
                client: clientData,
                device: searchResultData,
                accessoires,
                pannes
            };

            const interventionResponse = await axios.post('http://localhost:8080/intervention/addIntervention', interventionDataToSend);

            setSaveResponseData(interventionResponse.data) 

            setCurrentView(3);
        } catch (error) {
            console.error('Error saving client or intervention:', error);
            alert('An error occurred while saving the client or intervention or accessoires.');
        }

    };


    const handleClientInfoChange = (key, value) => {
        setClientInfo(prevInfo => ({ ...prevInfo, [key]: value }));
    };

    const handleInterventionDataChange = (key, value) => {
        setInterventionData(prevData => ({ ...prevData, [key]: value }));
    };

    return (
        <Layout>
            <div className=" flex justify-center">
                <form onSubmit={search} className="mb-3 p-4 flex justify-between items-center w-full bg-orange-500 rounded-lg">
                    <div>
                        <input name="imei" type="text" required placeholder="NUM IMEI" className="px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-orange-700 text-white rounded-lg">Rechercher</button>
                    </div>
                </form>
            </div>
            {currentView === -1 && <h2 className="text-center py-10 font-bold">LOADING</h2>}
            {currentView === 1 && <SearchResult action={createFile} data={searchResultData} />}
            {currentView === 2 && <FileCard onCancel={onCancelFile} action={saveFile} handleClientInfoChange={handleClientInfoChange} data={searchResultData} handleInterventionDataChange={handleInterventionDataChange} />}
            {currentView === 3 && <FicheIntervention data={saveResponseData} />}
        </Layout>
    )
}