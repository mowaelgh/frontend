import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout";

export default function SwapItems(data , onReplaceTerminal) {
    const [interventionData, setInterventionData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/swap/getAllSwaps")
            .then(response => {
                setInterventionData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data && data.imei) {
                    const response = await axios.get(`http://localhost:8080/intervention/getInterventionByImei/${data.imei}`);
                    setInterventionData(response.data);
                }
            } catch (error) {
                console.error("Error fetching intervention information:", error);
            }
        };

        fetchData();
    }, [data]);

    const handleReplaceTerminal = () => {
        setShowPopup(true);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleConfirm = () => {
        setShowPopup(false);
        onReplaceTerminal();
    };

    return (
        <Layout>
            <div className="mt-8 flex justify-center">
                <div className="w-full bg-white p-4 rounded-lg">
                    <h2 className="text-2xl font-bold">Suivi des terminaux en attente de swap</h2>
                    <table className="mt-5 w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border text-center font-bold">Num Fiche</th>
                                <th className="px-4 py-2 border text-center font-bold">Marque</th>
                                <th className="px-4 py-2 border text-center font-bold">Modele</th>
                                <th className="px-4 py-2 border text-center font-bold">IMEI</th>
                                <th className="px-4 py-2 border text-center font-bold">N°serie batterie</th>
                                <th className="px-4 py-2 border text-center font-bold">Date de fiche d'intervention</th>
                                <th className="px-4 py-2 border text-center font-bold">Retard</th>
                                <th className="px-4 py-2 border text-center font-bold">Swap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interventionData.map(item => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 border text-center">{item.id}</td>
                                    <td className="px-4 py-2 border text-center">{item.brand}</td>
                                    <td className="px-4 py-2 border text-center">{item.model}</td>
                                    <td className="px-4 py-2 border text-center">{item.imei}</td>
                                    <td className="px-4 py-2 border text-center">{item.batterie}</td>
                                    <td className="px-4 py-2 border text-center">{item.createdAt}</td>
                                    <td className="px-4 py-2 border text-center">{item.retard}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button onClick={handleReplaceTerminal} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Swap</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000005c]">
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                        <p className="text-lg font-semibold mb-4">Remplacement Produit :</p>
                        <p>Produit Disponible :</p>
                        <hr className="my-4" />
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Nom produit</th>
                                    <th className="border px-4 py-2">Num série</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interventionData && interventionData.device && (
                                    <tr>
                                        <td className="border px-4 py-2">{interventionData.device.brand}</td>
                                        <td className="border px-4 py-2">{interventionData.device.imei}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-400 px-4 py-2 rounded-lg text-white mr-4"
                            >
                                Fermer
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="bg-blue-500 px-4 py-2 rounded-lg text-white"
                            >
                                Remplacer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
        
    );
}
