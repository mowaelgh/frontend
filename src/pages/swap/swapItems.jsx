import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout";

export default function SwapItems() {
    const [interventionData, setInterventionData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/swap/getAllSwaps")
            .then(response => {
                setInterventionData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
                                    <td className="px-4 py-2 border text-center">{/* Replace with appropriate field */}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Swap</button>
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
