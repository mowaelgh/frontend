import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout";


export default function SwapItems() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/swap/getAllSwaps", data)
            .then(response => {
                setData(response.data);
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
                        <tbody>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border text-center font-bold">Num Fiche</th>
                                <th className="px-4 py-2 border text-center font-bold">Marque</th>
                                <th className="px-4 py-2 border text-center font-bold">Modele</th>
                                
                                <th className="px-4 py-2 border text-center font-bold">IMEI</th>
                                <th className="px-4 py-2 border text-center font-bold">N°serie batterie</th>
                                <th className="px-4 py-2 border text-center font-bold">date de fiche d'intervention</th>
                                <th className="px-4 py-2 border text-center font-bold">Retard</th>
                                <th className="px-4 py-2 border text-center font-bold">Swap</th>
                            </tr>
                            {data.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border text-center">{data.numFiche}</td>
                                    <td className="px-4 py-2 border text-center">{data.brand}</td>
                                    <td className="px-4 py-2 border text-center">{data.model}</td>
                                    <td className="px-4 py-2 border text-center">{data.imei}</td>
                                    <td className="px-4 py-2 border text-center">{data.batterySerial}</td>
                                    <td className="px-4 py-2 border text-center">{data.created_At}</td>
                                    <td className="px-4 py-2 border text-center">{data.delay}</td>
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