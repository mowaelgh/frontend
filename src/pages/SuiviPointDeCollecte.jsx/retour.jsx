import React, { useState, useEffect } from "react";
import Layout from "../layout";
import GenerateDech from "./generateDech";
import axios from 'axios';
import { AddSwap } from "../../hooks/api_inter_status";

export default function Retour() {
    const [showGenerateDech, setShowGenerateDech] = useState(false);
    const [interventionsStatus, setInterventionsStatus] = useState([]);
    const [selectedInterventionStatus, setSelectedInterventionStatus] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState('Terminal Mobile');

    useEffect(() => {
        axios.get('http://localhost:8080/interventionStatus/getAllInterventionsStatus')
            .then(response => {
                setInterventionsStatus(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the interventions!', error);
            });
    }, []);

    const handleGenerateDechClick = async () => {
        const data = interventionsStatus
            .filter(status => status.isSelected)[0];
        if (data != undefined) {
            try {
                const r = await AddSwap({
                    imei: data.newIMEI,
                    price: data.amount,
                    brand: data.marque,
                    model: data.modele,
                    status: "pending",
                    retard: 0,
                    intervention_id: data.intervention,
                })
                setSelectedInterventionStatus(r.response.data);
                setShowGenerateDech(true);
            } catch (error) {
                console.error('There was an error fetching the intervention status!', error);
                alert('There was an error fetching the intervention status!');
            }

            // axios.get(`http://localhost:8080/interventionStatus/getInterventionStatusById/${selectedIds[0]}`)
            //     .then(response => {
            //     })
            //     .catch(error => {
            //     });
        }
    };

    const handleCheckboxChange = (id) => {
        setInterventionsStatus(prevStatuses => prevStatuses.map(status =>
            status.id === id ? { ...status, isSelected: !status.isSelected } : status
        ));
    };

    const handleDestinationChange = (event) => {
        setSelectedDestination(event.target.value);
    };

    return (
        <Layout>
            {showGenerateDech ? (
                <GenerateDech
                    interventionStatus={selectedInterventionStatus}
                    destination={selectedDestination}
                />
            ) : (
                <div className="mt-8 flex justify-center">
                    <div className="w-full bg-white p-4 rounded-lg">
                        <h2 className="text-2xl font-bold">Trier par type d'operation</h2>
                        <div className="mt-4">
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-300"
                                style={{ width: "200px" }}
                                value={selectedDestination}
                                onChange={handleDestinationChange}
                            >
                                <option value="Terminal Mobile">Terminal Mobile</option>
                                <option value="Reparateur Externe 2">Reparateur Externe 2</option>
                                <option value="Reparateur Externe 3">Reparateur Externe 3</option>
                            </select>
                        </div>
                        <hr className="mt-5" />
                        <h2 className="mt-5 text-2xl font-bold">Liste des articles a expedier a l'entrepot</h2>
                        <table className="mt-5 w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border text-center font-bold">
                                        <input type="checkbox" className="mx-auto" />
                                    </th>
                                    <th className="px-4 py-2 border text-center font-bold">Marque</th>
                                    <th className="px-4 py-2 border text-center font-bold">Modele</th>
                                    <th className="px-4 py-2 border text-center font-bold">N'Serie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interventionsStatus.map((interventionStatus) => (
                                    <tr key={interventionStatus.id}>
                                        <td className="px-4 py-2 border text-center">
                                            <input
                                                type="checkbox"
                                                className="mx-auto"
                                                checked={interventionStatus.isSelected || false}
                                                onChange={() => handleCheckboxChange(interventionStatus.id)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border text-center">{interventionStatus.marque}</td>
                                        <td className="px-4 py-2 border text-center">{interventionStatus.modele}</td>
                                        <td className="px-4 py-2 border text-center">{interventionStatus.newIMEI}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleGenerateDechClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Generate Decharge
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
