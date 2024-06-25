import React, { useState } from "react";
import Layout from "../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function InterventionSearch() {
    const [interventionId, setInterventionId] = useState("");
    const [interventionData, setInterventionData] = useState(null);
    const [error, setError] = useState(null);

    const getInterventionById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/intervention/getInterventionById/${interventionId}`);
            setInterventionData(response.data);
            setError(null);
        } catch (err) {
            setInterventionData(null);
            setError(err.message || "Une erreur s'est produite lors de la recherche de l'intervention.");
        }
    };

    const handleInputChange = (event) => {
        setInterventionId(event.target.value);
    };

    const handleSearch = () => {
        getInterventionById();
    };

    const handlePrint = () => {
        const mywindow = window.open("", "PRINT", "height=600,width=800");
        const elem = document.getElementById("interventionDetails").cloneNode(true);
        elem.querySelector("#printButton").remove();
        mywindow.document.write('<html><head><title>Fiche d\'Intervention</title>');
        mywindow.document.write('<style>@media print {.hidden-print { display: none; } .voucher-table { width: 100%; border-collapse: collapse; } .voucher-table td, .voucher-table th { border: 1px solid #ddd; padding: 8px; } .voucher-table th { background-color: #f2f2f2; text-align: center; } .voucher-container { padding: 20px; max-width: 800px; margin: auto; } }</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write(elem.innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
        return true;
    };

    return (
        <Layout>
            <div className="mt-8 flex justify-center">
                <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">BON SAV</h2>
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Entrez le numéro de bon"
                            value={interventionId}
                            onChange={handleInputChange}
                            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
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
                        <div id="interventionDetails" className="voucher-container">
                            <div className="voucher-header text-center">Détails de l'intervention</div>
                            <table className="voucher-table mt-4">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border text-center">numéro de Bon</th>
                                        <th className="px-4 py-2 border text-center">Description</th>
                                        <th className="px-4 py-2 border text-center">Date</th>
                                        <th className="px-4 py-2 border text-center">Marque</th>
                                        <th className="px-4 py-2 border text-center">Modèle</th>
                                        <th className="px-4 py-2 border text-center">Numéro de Série</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 border text-center">{interventionData.id}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.description}</td>
                                        <td className="px-4 py-2 border text-center">{new Date(interventionData.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.brand}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.model}</td>
                                        <td className="px-4 py-2 border text-center">{interventionData.device.imei}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <button
                                    id="printButton"
                                    onClick={handlePrint}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    <FontAwesomeIcon icon={faPrint} className="mr-2" />
                                    Imprimer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}