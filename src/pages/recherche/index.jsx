import { useState } from "react";
import axios from 'axios';
import Layout from "../layout";
import SearchResult from "./SearchResult";
import NotFileCard from "./NotFileCard";
import FicheIntervention from "./FicheIntervention";
import FileCard from "./FileCard";
import { AddInterventionStatus } from "../../hooks/api_inter_status";

export default function RecherchePage() {

    const [currentView, setCurrentView] = useState("0");
    const [searchResultData, setSearchResultData] = useState({});
    const [clientInfo, setClientInfo] = useState({
        nom: "",
        prenom: "",
        numCin: "",
        numTel1: "",
        numTel2: ""
    });
    const [interventionData, setInterventionData] = useState({
        boutique: "",
        description: "",
        batterie: "",
        etatTerminal: "",
        terminalDePret: "",
        workflow: "",
    });
    const [saveResponseData, setSaveResponseData] = useState({});
    // const [hasDischargeId, setHasDischargeId] = useState(false);

    const search = async (e) => {
        e.preventDefault();
        const v = Object.fromEntries(new FormData(e.currentTarget));
        const imei = v.imei.toString();
        if (imei === "") return;
        setCurrentView("loading");
        try {
            const response = await axios.get(`http://localhost:8080/device/getDeviceById/${imei}`);
            const deviceData = response.data;
            const r = await checkDischargeStatus(deviceData.imei);
            deviceData.discharge = r;
            console.log(deviceData);
            setSearchResultData(deviceData);
            setCurrentView("searchResult");
        } catch (error) {
            alert('Device not found or an error occurred.');
            setCurrentView("");
        }
    }

    const checkDischargeStatus = async (imei) => {
        try {
            const response = await axios.get(`http://localhost:8080/intervention/hasDischarge/${imei}`);
            return (response.data);
        } catch (error) {
            console.error('Error checking discharge status:', error);
            return false;
        }
    };

    const createFile = () => setCurrentView("fileCard");
    const onCancelFile = () => setCurrentView("searchResult");

    const optionMapper = (v) => {
        const arr = [];
        for (const k in v)
            if (v[k].innerText)
                arr.push(v[k].innerText ?? "")
        return arr;
    }

    const saveFile = async (e) => {
        e.preventDefault();
        const accessoires = optionMapper(e.target["10"].options);
        const pannes = optionMapper(e.target["12"].options);

        try {
            const clientData = {
                lastName: clientInfo.nom,
                firstName: clientInfo.prenom,
                cin: clientInfo.numCin,
                phoneNumber1: clientInfo.numTel1,
                phoneNumber2: clientInfo.numTel2,
                email: clientInfo.email
            };

            const response = await axios.post('http://localhost:8080/client/addClient', clientData);
            const interventionDataToSend = {
                imei: searchResultData.imei,
                boutique: interventionData.boutique,
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

            setSaveResponseData(interventionResponse.data);
            setCurrentView("ficheIntervention");
        } catch (error) {
            console.error('Error saving client or intervention:', error);
            alert('An error occurred while saving the client or intervention or accessoires.');
        }
    };

    const saveDischarge = async (e) => {
        const result = await AddInterventionStatus(e);
        if (result.success) {
            alert("ok")
            return
        }
        alert("error")
    }

    const handleShowRemp = () => {
        console.log("change view");
        setCurrentView("REMP")
    }

    const handleClientInfoChange = (key, value) => {
        setClientInfo(prevInfo => ({ ...prevInfo, [key]: value }));
    };

    const handleInterventionDataChange = (key, value) => {
        setInterventionData(prevData => ({ ...prevData, [key]: value }));
    };

    return (
        <Layout>
            <div className="flex justify-center">
                <form onSubmit={search} className="mb-3 p-4 flex justify-between items-center w-full bg-orange-500 rounded-lg">
                    <div>
                        <input name="imei" type="text" required placeholder="NUM IMEI" className="px-3 py-2 rounded-lg" />
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-orange-700 text-white rounded-lg">Rechercher</button>
                    </div>
                </form>
            </div>

            {currentView === "loading" && <h2 className="text-center py-10 font-bold">LOADING</h2>}
            {currentView === "searchResult" && (
                <SearchResult
                    data={searchResultData}
                    onReplaceTerminal={handleShowRemp}
                    onCreateFile={createFile} // Toggle to show FileCard
                />
            )}

            {currentView === "fileCard" && (
                <FileCard
                    action={saveFile}
                    handleClientInfoChange={handleClientInfoChange}
                    handleInterventionDataChange={handleInterventionDataChange}
                    data={searchResultData}
                />
            )}

            {currentView === "REMP" && (<NotFileCard data={searchResultData} />)}
            {currentView === "ficheIntervention" && <FicheIntervention data={saveResponseData} />}
        </Layout>
    );
}
