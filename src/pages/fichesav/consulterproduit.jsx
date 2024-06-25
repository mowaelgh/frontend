import React, { useState } from "react";
import DetailsFiche from "./detailsFiche";
import { DetailfichSav } from "../../hooks/api_search";

export default function Produit({ info, selectedOption }) {
    const [showDetails, setShowDetails] = useState(false);
    const [produitDetails, setProduitDetails] = useState({});

    const handleRowClick = async (id) => {
        setShowDetails(true);
        const r = await DetailfichSav(id)
        if (r.success) {
            setProduitDetails(r.data)
            setShowDetails(true);
        } else {
            alert(r.data)
        }
    };

    const getOptionLabel = () => {
        switch (selectedOption) {
            case "CIN":
                return "CIN client";
            case "NFICH":
                return "N'Fiche";
            case "IMEI":
                return "N'Serie";
            default:
                return "";
        }
    };

    return (
        <div className="mt-8 flex justify-center">
            {showDetails ? (
                <DetailsFiche info={produitDetails} />
            ) : (
                <div className="w-full bg-white p-4 rounded-lg">
                    <h2 className="text-2xl font-bold">Consulter produit</h2>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                            <tbody>
                                <tr className="bg-gray-200">
                                    <td className="px-4 py-2 border text-center font-bold">{getOptionLabel()}</td>
                                    <td className="px-4 py-2 border text-center font-bold">Date</td>
                                    <td className="px-4 py-2 border text-center font-bold">Status</td>
                                </tr>
                                <tr onClick={() => handleRowClick(info.id)} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border text-center">
                                        {selectedOption === "CIN" && info.cin}
                                        {selectedOption === "NFICH" && info.id}
                                        {selectedOption === "IMEI" && info.imei}
                                    </td>
                                    <td className="px-4 py-2 border text-center">{new Date(info.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border text-center">{info.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}