import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GenerateDech({ discharge, selectedInterventions, onDechargeGenerated }) {
    const [interventionsWithRepairType, setInterventionsWithRepairType] = useState([]);

    useEffect(() => {
        const fetchRepairTypes = async () => {
            const updatedInterventions = await Promise.all(selectedInterventions.map(async (intervention) => {
                const repairTypeResponse = await getRepairType(intervention.id);
                if (repairTypeResponse.success) {
                    return {
                        ...intervention,
                        repairType: repairTypeResponse.data,
                    };
                } else {
                    return intervention;
                }
            }));
            setInterventionsWithRepairType(updatedInterventions);
        };

        fetchRepairTypes();
    }, [selectedInterventions]);

    const getRepairType = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/intervention/getRepairType/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Error fetching repair type:', error);
            return { success: false, data: error.message };
        }
    };

    const toPrint = () => {
        // Open a new window for printing
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        // Create a copy of the component element for printing
        const elem = document.getElementById("fichPrint").cloneNode(true);

        // Remove the button from the copied element
        elem.querySelector("#impBtn").remove();

        // Write the copied element content to the new window
        mywindow.document.write('<html><head><title>Fiche</title>');
        mywindow.document.write('<style>.flex{display:flex;}.justify-between{justify-content: space-between;}.text-center{text-align: center;}</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write(elem.innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        // mywindow.close();

        return true;
    }

    return (
        <div id="fichPrint" className="w-full bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <img src="/assets/img/logoorange.png" alt="Logo" className="mr-4" style={{ width: "150px", height: "auto" }} />
                {/* Title */}
                <h2 style={{ width: "100%" }} className="font-bold text-center text-2xl flex-grow py-5">Decharge d'envoi</h2>
            </div>
            <div className="flex justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Ref decharge : <span className="font-bold">{discharge.id}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Depart : <span className="font-bold">{discharge.interventions?.device?.boutique}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Destination : <span className="font-bold">{discharge.destination}</span>
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Date : <span className="font-bold">{discharge.createdAt}</span>
                    </p>
                </div>
            </div>
            <table className="mt-5 w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
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
                    {interventionsWithRepairType.map((intervention, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border text-center">{intervention.id}</td>
                            <td className="px-4 py-2 border text-center">{intervention.device?.brand}</td>
                            <td className="px-4 py-2 border text-center">{intervention.device?.model}</td>
                            <td className="px-4 py-2 border text-center">{intervention.device?.imei}</td>
                            <td className="px-4 py-2 border text-center">{intervention.device?.batterie}</td>
                            <td className="px-4 py-2 border text-center">{intervention.device?.supplier}</td>
                            <td className="px-4 py-2 border text-center">{intervention.repairType}</td>
                            <td className="px-4 py-2 border text-center">{intervention.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="impBtn" className="flex justify-center mt-4">
                <button onClick={toPrint} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Imprimer</button>
            </div>
        </div>
    );
}
