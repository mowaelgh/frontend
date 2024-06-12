import React, { useEffect, useState } from "react";
import { updateFich } from "../../hooks/api_search";

export default function DetailsFiche({ info }) {
    const [editableData, setEditableData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEditableData(
            [
                info.createdAt || "",
                info.lieu || "",
                info.status || "",
                info.etat || "",
                info.utilisateur || "",
                info.commentaire || ""
            ])
    }, [info])

    const handleInputChange = (index, event) => {
        const newData = [...editableData];
        newData[index] = event.target.value;
        setEditableData(newData);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);

        console.log(info);
        const r = await updateFich();
        if (r.success) {
            console.log('Fetched data:', r.data);
            setEditableData([
                r.data.createdAt || "",
                r.data.lieu || "",
                r.data.status || "",
                r.data.etat || "",
                r.data.utilisateur || "",
                r.data.commentaire || ""
            ]);
            setIsEditing(true);
        } else {
            alert(r.data);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full bg-white p-4 rounded-lg">
                <h2 className="text-2xl font-bold">Details Fiche</h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                            <tr className="bg-gray-200">
                                <td className="px-4 py-2 border text-center font-bold">Date</td>
                                <td className="px-4 py-2 border text-center font-bold">Lieu</td>
                                <td className="px-4 py-2 border text-center font-bold">Statut</td>
                                <td className="px-4 py-2 border text-center font-bold">Etat</td>
                                <td className="px-4 py-2 border text-center font-bold">Utilisateur</td>
                                <td className="px-4 py-2 border text-center font-bold">Commentaire</td>
                            </tr>
                            <tr>
                                {isEditing ? (
                                    editableData.map((value, index) => (
                                        <td key={index} className="px-4 py-2 border text-center">
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(event) => handleInputChange(index, event)}
                                                className="px-2 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                    ))
                                ) : (
                                    editableData.map((value, index) => (
                                        <td key={index} className="px-4 py-2 h-4 border text-center">{value}</td>
                                    ))
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    {isEditing ? (
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSaveClick}>Save</button>
                    ) : (
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleEditClick}>Modifier</button>
                    )}
                </div>
                <hr className="mt-5" />
                <h2 className="mt-5 text-2xl font-bold">Details de la joignabilité client</h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                            <tr className="bg-gray-200">
                                <td className="px-4 py-2 border text-center font-bold">Utilisateur</td>
                                <td className="px-4 py-2 border text-center font-bold">Joignabilité client</td>
                                <td className="px-4 py-2 border text-center font-bold">Date & Heure d'appel</td>
                                <td className="px-4 py-2 border text-center font-bold">Date de prise en charge</td>
                                <td className="px-4 py-2 border text-center font-bold">Commentaire</td>
                            </tr>
                            {/* Add additional rows for client reachability details as needed */}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Ajouter joignabilité client</button>
                </div>
            </div>
        </div>
    );
}
