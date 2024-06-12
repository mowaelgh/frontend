import React , {useState} from "react";
import Layout from "../layout";
import GenerateDech from "./generateDech";
export default function RepInterne() {
    const [showGenerateDech, setShowGenerateDech] = useState(false);

    const handleGenerateDechClick = () => {
        setShowGenerateDech(true);
    };

    return (
        <Layout>
             {showGenerateDech ? (
                <GenerateDech />
            ) : (
            <div className="mt-8 flex justify-center">
                <div className="w-full bg-white p-4 rounded-lg">
                    <h2 className="text-2xl font-bold">Selectionner un reparateur interne</h2>
                    <div className="mt-4">
                        <select className="px-3 py-2 rounded-lg border border-gray-300" style={{ width: "200px" }}>
                            <option value="reparateur1">One Tel</option>
                            <option value="reparateur2">Reparateur Externe 2</option>
                            <option value="reparateur3">Reparateur Externe 3</option>
                        </select>
                    </div>
                    <hr className="mt-5" />
                    <h2 className="mt-5 text-2xl font-bold">Liste des articles a expedier aux reparateurs interne</h2>
                    <table className="mt-5 w-full border-collapse">
                        <tbody>
                            <tr className="bg-gray-200">
                                <td className="px-4 py-2 border text-center font-bold">
                                    <input type="checkbox" className="mx-auto" />
                                </td>
                                <td className="px-4 py-2 border text-center font-bold">Num Fiche</td>
                                <td className="px-4 py-2 border text-center font-bold">Marque</td>
                                <td className="px-4 py-2 border text-center font-bold">Modele</td>
                                <td className="px-4 py-2 border text-center font-bold">N'Serie</td>
                                <td className="px-4 py-2 border text-center font-bold">N'Serie batterie</td>
                                <td className="px-4 py-2 border text-center font-bold">Fournisseur</td>
                                <td className="px-4 py-2 border text-center font-bold">Etat Fiche</td>
                                <td className="px-4 py-2 border text-center font-bold">Observations</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-center">
                                    <input type="checkbox" className="mx-auto" />
                                </td>
                                {[...Array(8)].map((_, index) => (
                                    <td key={index + 1} className="px-4 py-2 border text-center">Data {index + 1}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleGenerateDechClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Generate Decharge</button>
                    </div>
                </div>
            </div>
             )}
        </Layout>
    );
}
