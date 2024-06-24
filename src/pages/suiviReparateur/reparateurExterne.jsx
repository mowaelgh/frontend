import { useEffect, useState } from "react";
import React from "react";
import Layout from "../layout";
import GenerateDech from "./generateDech";
import axios from "axios";

export default function RepInterne() {
    const [showGenerateDech, setShowGenerateDech] = useState(false);
    const [interventions, setInterventions] = useState([]);
    const [selectedInterventions, setSelectedInterventions] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [generatedDischarge, setGeneratedDischarge] = useState(null);

    useEffect(() => {
        fetchInterventions();
    }, []);

    const fetchInterventions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/intervention/externe");
            setInterventions(response.data);
        } catch (error) {
            console.error("Error fetching interventions:", error);
        }
    };

    const handleCheckboxChange = (intervention) => {
        if (selectedInterventions.includes(intervention)) {
            setSelectedInterventions(selectedInterventions.filter(i => i !== intervention));
        } else {
            setSelectedInterventions([...selectedInterventions, intervention]);
        }
    };

    const handleGenerateDechClick = async () => {
        try {
            // Make a POST request to your backend endpoint
            const response = await axios.post("http://localhost:8080/discharge/addDischarge", {
                selectedInterventions: selectedInterventions.map(intervention => intervention.id),
                destination: selectedDestination
            });

            // Handle successful response if needed
            console.log("Decharge generated successfully:", response.data);

            // Fetch the discharge details by ID
            const dischargeResponse = await axios.get(`http://localhost:8080/discharge/getDischargeById/${response.data.id}`);
            setGeneratedDischarge(dischargeResponse.data);


            // After generating the décharge, update UI or perform other actions
            setShowGenerateDech(true); // Show GenerateDech component if needed
            
        } catch (error) {
            console.error("Error generating decharge:", error);
            // Handle error if needed
        }
    };

    const handleDechargeGenerated = () => {
        // Update the interventions list to remove selected interventions
        const updatedInterventions = interventions.filter(intervention => !selectedInterventions.includes(intervention));
        setInterventions(updatedInterventions);
        setSelectedInterventions([]); // Clear selected interventions
        setShowGenerateDech(false); // Hide the GenerateDech component
    };

    return (
        <Layout>
             {showGenerateDech ? (
                <GenerateDech discharge={generatedDischarge} selectedInterventions={selectedInterventions} onDechargeGenerated={handleDechargeGenerated} />
            ) : (
            <div className="mt-8 flex justify-center">
                <div className="w-full bg-white p-4 rounded-lg">
                    <h2 className="text-2xl font-bold">Selectionner un reparateur externe</h2>
                    <div className="mt-4">
                        <select
                            className="px-3 py-2 rounded-lg border border-gray-300"
                            style={{ width: "200px" }}
                            onChange={(e) => setSelectedDestination(e.target.value)}
                        >
                            <option value="One Tel">One Tel</option>
                            <option value="Reparateur Externe 2">Reparateur Externe 2</option>
                            <option value="Reparateur Externe 3">Reparateur Externe 3</option>
                        </select>
                    </div>
                    <hr className="mt-5" />
                    <h2 className="mt-5 text-2xl font-bold">Liste des articles a expedier aux reparateurs interne</h2>
                    <table className="mt-5 w-full border-collapse">
                    <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border text-center font-bold">
                                        <input type="checkbox" className="mx-auto" />
                                    </th>
                                    <th className="px-4 py-2 border text-center font-bold">Num Fiche</th>
                                    <th className="px-4 py-2 border text-center font-bold">Marque</th>
                                    <th className="px-4 py-2 border text-center font-bold">Modele</th>
                                    <th className="px-4 py-2 border text-center font-bold">N'Serie</th>
                                    <th className="px-4 py-2 border text-center font-bold">N'Serie batterie</th>
                                    <th className="px-4 py-2 border text-center font-bold">Fournisseur</th>
                                    <th className="px-4 py-2 border text-center font-bold">Etat Fiche</th>
                                    <th className="px-4 py-2 border text-center font-bold">Observations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interventions.map((intervention, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border text-center">
                                            <input type="checkbox" className="mx-auto" onChange={() => handleCheckboxChange(intervention)} />
                                        </td>
                                        <td className="px-4 py-2 border text-center">{intervention.id}</td>
                                        <td className="px-4 py-2 border text-center">{intervention.device?.brand}</td>
                                        <td className="px-4 py-2 border text-center">{intervention.device?.model}</td>
                                        <td className="px-4 py-2 border text-center">{intervention.device?.imei}</td>
                                        <td className="px-4 py-2 border text-center">{intervention.device?.batterie}</td>
                                        <td className="px-4 py-2 border text-center">{}</td>
                                        <td className="px-4 py-2 border text-center">{intervention.repairType}</td>
                                        <td className="px-4 py-2 border text-center">{intervention.etat}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleGenerateDechClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Generate Decharge</button>
                    </div>
                </div>
            </div>
             )}
        </Layout>
    );
}
