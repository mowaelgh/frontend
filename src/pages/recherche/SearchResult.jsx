import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SearchResult({ data, onReplaceTerminal, onCreateFile }) {
    const [remainingWarranty, setRemainingWarranty] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [interventionData, setInterventionData] = useState(null);

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

    useEffect(() => {
        const calculateRemainingWarranty = () => {
            if (data && data.guarantee && data.purchase_date) {
                const warrantyInMonths = data.guarantee ?? 0;
                const purchaseDate = new Date(data.purchase_date);
                const monthsSincePurchase = Math.floor((Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
                const remainingWarrantyMonths = Math.max(warrantyInMonths - monthsSincePurchase, 0);
                setRemainingWarranty(remainingWarrantyMonths);
            }
        };

        calculateRemainingWarranty();
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

    const handleCreateFile = () => {
        onCreateFile(); // Toggle to show FileCard
    };

    return (
        <div className="p-4 bg-white rounded-lg flex flex-col gap-10 justify-center items-center relative">
            <h2 className="text-2xl">Information Produits</h2>
            <div className="flex flex-col justify-end items-center gap-3">
                <hr className="w-20 border-2 border-gray-600" />
                <div className="flex flex-col">
                    <p>Etat: <b>{data.status}</b></p>
                    <p>Date d'achat: <b>{new Date(data.purchase_date).toLocaleDateString()}</b></p>
                    <p>Durée de garantie: <b>{data.guarantee} <span>mois</span></b></p>
                    <p>Reste de la durée de garantie: <b>{remainingWarranty} <span>mois</span></b></p>
                    <p>Nombre de retour SAV: <b>{data.nbRetourSav}</b></p>
                    <p>Terminal Assuré: <b>{data.terminal}</b></p>
                </div>
                <hr className="w-20 border-2 border-gray-600" />
            </div>

            {
                (data.status == "0" ?
                    <p className="bg-green-300 w-full text-center text-green-700 font-bold p-2">
                        fff
                    </p>
                    : <div className="flex justify-center gap-2">
                        {data.discharge && (<button
                            className="bg-blue-500 px-4 py-2.5 rounded-lg text-white text-sm font-bold"
                            onClick={handleReplaceTerminal}
                        >
                            Remplacer Terminal
                        </button>)}
                        <button
                            onClick={handleCreateFile}
                            className="bg-green-500 px-4 py-2.5 rounded-lg text-white text-sm font-bold"
                        >
                            Créer Fichier
                        </button>
                    </div>

                )
            }





            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000005c]">
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                        <p className="text-lg font-semibold mb-4">Confirmation</p>
                        <p>Êtes-vous sûr de vouloir remplacer le terminal?</p>
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
        </div>
    );
}
