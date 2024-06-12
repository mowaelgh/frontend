import React from "react";
import Layout from "../layout";

export default function RecuExterne() {
    return (
        <Layout>
            <div className="mt-8 flex justify-center">
                <div className="w-full bg-white p-4 rounded-lg">
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
                            {[...Array(6)].map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {[...Array(6)].map((_, colIndex) => (
                                        <td key={colIndex} className="px-4 py-2 border text-center">Data</td>
                                    ))}
                                    <td className="px-4 py-2 border text-center">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">OK</button>
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
