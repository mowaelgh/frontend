import React, { useState } from "react";
import Layout from "../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GetDischargeById } from "../../hooks/api_inter_status";

export default function SearchIntervention() {
    const [dischargeId, setDischargeId] = useState("");
    const [interventionData, setInterventionData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setError(null); // Reset error before new search
        setInterventionData(null); // Reset data before new search
        if (!dischargeId || isNaN(dischargeId)) {
            setError("Please enter a valid numeric ID");
            return;
        }
        try {
            const result = await GetDischargeById(dischargeId);
            console.log("API Response:", result); // Log the entire API response
            if (result.success) {
                setInterventionData(result.data);
            } else {
                setError(result.message || "Error fetching intervention. Please try again.");
            }
        } catch (err) {
            console.error("API Error:", err);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="mt-8 flex justify-center">
                <div className="w-full bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Recherche de décharge</h2>
                    <div className="mt-4 flex items-center mb-4">
                        <input
                            type="text"
                            value={dischargeId}
                            onChange={(e) => setDischargeId(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-300 w-52"
                            placeholder="Entrez l'ID de la décharge"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 flex items-center"
                        >
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                            Rechercher
                        </button>
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {interventionData && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Détails de décharge</h3>
                            <table className="mt-5 w-full border-collapse">
                                <tbody>
                                    <tr className="bg-gray-200">
                                        <td className="px-4 py-2 border text-center font-bold">Marque</td>
                                        <td className="px-4 py-2 border text-center font-bold">Modele</td>
                                        <td className="px-4 py-2 border text-center font-bold">N'Serie</td>
                                        <td className="px-4 py-2 border text-center font-bold">N'Serie batterie</td>
                                        <td className="px-4 py-2 border text-center font-bold">Fournisseur</td>
                                        <td className="px-4 py-2 border text-center font-bold">Date</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.brand}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.model}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.imei}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.batterie}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.supplier}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.createdAt}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
