import React, { useState, useEffect } from "react";
import Layout from "../layout";
import axios from "axios";

export default function RecuExterne() {
    const [interventions, setInterventions] = useState([]);

    useEffect(() => {
        const fetchInterventions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/intervention/getInterventionDecharge');
                const externeInterventions = response.data.filter(intervention => intervention.workflow === 'externe');
                const updatedInterventions = await Promise.all(externeInterventions.map(async intervention => {
                    const repairTypeResponse = await axios.get(`http://localhost:8080/intervention/getRepairType/${intervention.id}`);
                    intervention.repairType = repairTypeResponse.data;
                    return intervention;
                }));
                setInterventions(updatedInterventions);
            } catch (error) {
                console.error('Error fetching interventions:', error);
            }
        };

        fetchInterventions();
    }, []);

    const handleRemoveIntervention = (index) => {
        const updatedInterventions = interventions.filter((_, i) => i !== index);
        setInterventions(updatedInterventions);
    };

    return (
        <Layout>
            <div className="mt-8 flex justify-center">
                <div className="w-full bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">Trier par type de opération</h2>
                    <div className="mt-4">
                        <select className="px-3 py-2 rounded-lg border border-gray-300" style={{ width: "200px" }}>
                            <option value="option1">Réparé</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <hr className="mt-5" />
                    <h2 className="mt-5 text-2xl font-bold">Liste des articles à expédier aux réparateurs externes</h2>
                    <table className="mt-5 w-full border-collapse">
                        <tbody>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border text-center font-bold">Num Fiche</th>
                                <th className="px-4 py-2 border text-center font-bold">Modele</th>
                                <th className="px-4 py-2 border text-center font-bold">N'Serie</th>
                                <th className="px-4 py-2 border text-center font-bold">N'Serie batterie</th>
                                <th className="px-4 py-2 border text-center font-bold">Etat Fiche</th>
                                <th className="px-4 py-2 border text-center font-bold">Etat</th>
                                <th className="px-4 py-2 border text-center font-bold"></th>
                            </tr>
                            {interventions.map((intervention, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border text-center">{intervention.id}</td>
                                    <td className="px-4 py-2 border text-center">{intervention.device.model}</td>
                                    <td className="px-4 py-2 border text-center">{intervention.device.imei}</td>
                                    <td className="px-4 py-2 border text-center">{intervention.device?.batterie}</td>
                                    <td className="px-4 py-2 border text-center">{intervention.repairType}</td>
                                    <td className="px-4 py-2 border text-center">{intervention.etat}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => handleRemoveIntervention(index)}  >OK</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
