import { useState } from "react";

export default function FileCard({ onCancel, action, handleClientInfoChange, handleInterventionDataChange, data, handleAccessoiresDataChange }) {
 
    // State to store selected options for "Accessoires"
    const [selectedAccessoires, setSelectedAccessoires] = useState([]);
    const [selectedPanne, setSelectedPanne] = useState([]);

    const [etatTerminal, setEtatTerminal] = useState("");
    const [batterie, setBatterie] = useState("");
    const [terminalPret, setTerminalPret] = useState("");
    const [workflow, setWorkflow] = useState("");
    const [description, setDescription] = useState("");

    // Function to add an option to the second box for "Accessoires"
    const addToSecondBoxAccessoires = () => {
        const selectedOption = document.getElementById('accessoires').value;
        const r = selectedAccessoires.find((v) => v == selectedOption)
        if (r != undefined) return
        setSelectedAccessoires([...selectedAccessoires, selectedOption]);
    };

    // Function to remove the last added option from the second box for "Accessoires"
    const removeFromSecondBoxAccessoires = () => {
        const updatedOptions = [...selectedAccessoires];
        updatedOptions.pop();
        setSelectedAccessoires(updatedOptions);
    };

   

    // Function to add an option to the second box for "Type de panne"
    const addToSecondBoxPanne = () => {
        const selectedOption = document.getElementById('panne').value;
        const r = selectedPanne.find((v) => v == selectedOption)
        if (r != undefined) return
        setSelectedPanne([...selectedPanne, selectedOption]);
    };

    // Function to remove the last added option from the second box for "Type de panne"
    const removeFromSecondBoxPanne = () => {
        const updatedOptions = [...selectedPanne];
        updatedOptions.pop();
        setSelectedPanne(updatedOptions);
    };

   const handleEtatTerminalChange = (event) => {
        setEtatTerminal(event.target.value);
        handleInterventionDataChange("etatTerminal", event.target.value);
    };

    const handleBatterieChange = (event) => {
        setBatterie(event.target.value);
        handleInterventionDataChange("batterie", event.target.value);
    };

    const handleTerminalPretChange = (event) => {
        setTerminalPret(event.target.value);
        handleInterventionDataChange("terminalDePret", event.target.value);
    };

    const handleWorkflowChange = (event) => {
        setWorkflow(event.target.value);
        handleInterventionDataChange("workflow", event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        handleInterventionDataChange("description", event.target.value);
    };
    const handleNextClick = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("are you sure want to proceed ?");
        if (confirmed==true) {
            console.log("confirmed",confirmed)
            action(e);
        }
    };

    const cancel = () => {
        onCancel()
    }

    return (
        <div className="mt-4 w-full bg-white p-4 rounded-lg">
            <h2 className="font-bold mb-4">Informations client</h2>
            <form onSubmit={handleNextClick}>
                {/* First row of inputs */}
                <div className="flex mb-4">
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="nom" className="text-sm font-medium text-gray-700">Nom :</label>
                        <input type="text" name="nom" id="nom" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} onChange={(e) => handleClientInfoChange("nom", e.target.value)} />
                    </div>
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="numTel1" className="text-sm font-medium text-gray-700">Num Tel 1 :</label>
                        <input type="text" name="numTel1" id="numTel1" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} onChange={(e) => handleClientInfoChange("numTel1", e.target.value)} />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="numCin" className="text-sm font-medium text-gray-700">Num Cin/passeport :</label>
                        <input type="text" name="numCin" id="numCin" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} onChange={(e) => handleClientInfoChange("numCin", e.target.value)} />
                    </div>
                </div>
                {/* Second row of inputs */}
                <div className="flex mb-4">
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="prenom" className="text-sm font-medium text-gray-700">Prénom :</label>
                        <input type="text" name="prenom" id="prenom" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} onChange={(e) => handleClientInfoChange("prenom", e.target.value)} />
                    </div>
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="num2" className="text-sm font-medium text-gray-700">Num Tel 2 :</label>
                        <input type="text" name="numTel2" id="num2" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} onChange={(e) => handleClientInfoChange("numTel2", e.target.value)} />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email :</label>
                        <input type="email" name="email" id="email" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} onChange={(e) => handleClientInfoChange("email", e.target.value)} />
                    </div>
                </div>
                <hr className="mb-4" />
                <h2 className="font-bold mb-4">Material</h2>
                <div className="flex mb-4 items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Marque: <span className="font-bold ml-10">{data.brand}</span></p>
                    <p className="text-sm font-medium text-gray-700 ">Num de serie/IMEI : <span className="font-bold ml-10">{data.imei}</span></p>
                    <div>
                        <label htmlFor="etatTerminal" className="text-sm font-medium text-gray-700 mr-14">Etat terminal :</label>
                        <select name="etatTerminal" id="etatTerminal" className="p-1 border rounded-lg mr-4" style={{ width: "100px" }} onChange={handleEtatTerminalChange}>
                            <option value="Bon etat">Bon Etat</option>
                            <option value="Mauvais etat">Mauvais etat</option>
                        </select>
                    </div>
                </div>
                <div className="flex mb-4 items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 mr-2 ">Modèle: <span className=" p-1 font-bold ml-10">{data.model}</span></p>
                    <div className="w-1/2 flex items-center">
                        <label htmlFor="batterie" className="text-sm font-medium text-gray-700 mr-6 ml-16">Batterie:</label>
                        <div className="mr-4">
                            <input type="checkbox" id="Avec" name="Avec" value="Avec" className="mr-1 border-gray-300 rounded-full" onChange={handleBatterieChange} />
                            <label htmlFor="Avec" className="mr-4">Avec</label>
                            <input type="checkbox" id="Sans" name="Sans" value="Sans" className="mr-1 border-gray-300 rounded-full" onChange={handleBatterieChange} />
                            <label htmlFor="Sans">Sans</label>
                        </div>
                    </div>
                </div>
                <div className="flex mb-4 items-center justify-between">
                    <label htmlFor="accessoires" className="text-sm font-medium text-gray-700 mr-2" style={{ width: "150px" }}>Accessoires:</label>
                    <select id="accessoires" name="accessoires" multiple className="p-1 border rounded-lg mr-4 ml-3" style={{ width: "400px", height: "150px" }}>
                        <option value="chargeur">Chargeur </option>
                        <option value="cableUSB">Câble USB</option>
                    </select>
                    <div className="flex flex-col items-center">
                        <a onClick={addToSecondBoxAccessoires} className="bg-gray-400 text-white px-2 py-2 rounded-lg mb-2 text-center cursor-pointer w-28">Ajouter</a>
                        <a onClick={removeFromSecondBoxAccessoires} className="bg-gray-400 text-white px-2 py-2 rounded-lg mb-2 text-center cursor-pointer w-28">Enlever</a>
                    </div>
                    <select multiple className="p-1 border rounded-lg ml-3" style={{ width: "400px", height: "150px" }}>
                        {selectedAccessoires.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex mb-4 items-center justify-between">
                    <label htmlFor="panne" className="text-sm font-medium text-gray-700 mr-2" style={{ width: "150px" }}>Type de panne:</label>
                    <select id="panne" name="panne" multiple className="p-1 border rounded-lg mr-4 ml-3" style={{ width: "400px", height: "150px" }}>
                        <option value="Caméra">Caméra</option>
                        <option value="Panne clavier">Panne clavier</option>
                        <option value="Panne tactile">Panne tactile</option>
                        <option value="Panne caméra">Panne caméra</option>
                        <option value="Auronomie">Auronomie</option>
                        <option value="Problème de charge">Problème de charge</option>
                    </select>
                    <div className="flex flex-col items-center">
                        <a onClick={addToSecondBoxPanne} className="bg-gray-400 text-white px-2 py-2 rounded-lg mb-2 text-center cursor-pointer w-28">Ajouter</a>
                        <a onClick={removeFromSecondBoxPanne} className="bg-gray-400 text-white px-2 py-2 rounded-lg mb-2  text-center cursor-pointer w-28">Enlever</a>
                    </div>
                    <select multiple className="p-1 border rounded-lg ml-3" style={{ width: "400px", height: "150px" }}>
                        {selectedPanne.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex mb-4 items-center">
                    <label htmlFor="terminalPret" className="text-sm font-medium text-gray-700 mr-2 ">Terminal de prêt:</label>
                    <div className="mr-4 ml-10">
                        <input type="checkbox" id="avec" name="avec" value="avec" className="mr-1 border-gray-300 rounded-full" onChange={handleTerminalPretChange} />
                        <label htmlFor="avec" className="mr-4">Avec</label>
                        <input type="checkbox" id="sans" name="sans" value="sans" className="mr-1 border-gray-300 rounded-full" onChange={handleTerminalPretChange} />
                        <label htmlFor="sans">Sans</label>
                    </div>
                </div>

                <div className="flex mb-4 items-center">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700 mr-2">Description de panne:</label>
                    <input type="text" name="description" id="description" className="mt-1 p-2 border rounded-lg" style={{ width: "200px" }} onChange={handleDescriptionChange} />
                </div>

                <div className="flex mb-4 items-center">
                    <label htmlFor="workflow" className="text-sm font-medium text-gray-700 mr-2">Choix de workflow:</label>
                    <select id="workflow" name="workflow" className="p-1 border rounded-lg mr-4" style={{ width: "200px" }} onChange={handleWorkflowChange}>
                        <option value="externe">Réparateur externe</option>
                        <option value="interne">Réparateur interne</option>
                        <option value="normal">Workflow normal</option>
                    </select>
                </div>

                <div className="flex justify-end">
                    <div>
                        <button type="reset" onClick={cancel} className="bg-red-500 text-white px-4 py-3 rounded-lg mr-4">Annuler</button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-3 rounded-lg">Suivant</button>
                    </div>
                </div>
            </form>
        </div>
    );
};