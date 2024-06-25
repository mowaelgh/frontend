import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout";

export default function SwapItems({ data, onReplaceTerminal }) {
    const [interventionData, setInterventionData] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null); // Add a state for selected device
    const [showPopup, setShowPopup] = useState(false);
    const [showForm, setShowForm] = useState(false); // Add a state for form visibility
    const [showTicket, setShowTicket] = useState(false);
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/swap/getAllSwaps")
            .then(response => {
                console.log(response.data);
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

    const handleReplaceTerminal = (device) => {
        setSelectedDevice(device); // Set the selected device
        setShowPopup(true);
        setShowForm(false); // Ensure the form is not shown initially
    };

    const handleCancel = () => {
        setShowPopup(false);
        setShowForm(false); // Reset form visibility
    };

    const handleConfirm = () => {
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newIMEI = formData.get('newIMEI');
        
        setShowPopup(false);
        setShowForm(false);
        onReplaceTerminal({ newIMEI });
    };

    const handleGenerateTicket = () => {
        const ticketDetails = {
            imei: selectedDevice.imei,
            marque: selectedDevice.brand,
            modele: selectedDevice.model,
            date: new Date().toLocaleDateString(),
            prix: 'amount'  // Replace this with the actual amount if available
        };
        setTicketData(ticketDetails);
        setShowTicket(true);
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
        <Layout>
            {!showTicket ? (
                <>
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
                                            <td className="px-4 py-2 border text-center">{item.batterie || '50987'}</td>
                                            <td className="px-4 py-2 border text-center">{item.createdAt || '2024-04-21'}</td>
                                            <td className="px-4 py-2 border text-center">{item.retard}</td>
                                            <td className="px-4 py-2 border text-center">
                                                <button onClick={() => handleReplaceTerminal(item)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Swap</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showPopup && selectedDevice && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000005c]">
                            <div className="bg-white rounded-lg p-8 shadow-lg">
                                {!showForm ? (
                                    <>
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
                                                <tr>
                                                    <td className="border px-4 py-2">{selectedDevice.brand}</td>
                                                    <td className="border px-4 py-2">{selectedDevice.imei}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={handleConfirm}
                                                className="bg-orange-600 px-4 py-2 rounded-lg text-white mr-4"
                                            >
                                                Remplacer
                                            </button>
                                            <button
                                                onClick={handleGenerateTicket}
                                                className="bg-black px-4 py-2 rounded-lg text-white"
                                            >
                                                Generer ticket achat sav
                                            </button>
                                        </div>
                                        <button 
                                            onClick={handleCancel} 
                                            className="justify-items-end px-4 py-2 bg-white text-black rounded-lg shadow-lg mt-4"
                                        >
                                            Fermer
                                        </button>
                                    </>
                                ) : (
                                    <div className="mt-4 w-full bg-grey p-4 rounded-lg">
                                        <form onSubmit={handleSubmit}>
                                            <h2 className="font-bold mb-4">Materiel de Remplacement</h2>
                                            <div className="flex mb-4">
                                                <div className="w-1/3 pr-2 flex flex-col">
                                                    <label htmlFor="imei" className="text-sm font-medium text-gray-700">Num de série / IMEI :</label>
                                                    <input type="text" name="imei" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} required />
                                                    <label htmlFor="marque" className="text-sm font-medium text-gray-700">Marque :</label>
                                                    <input type="text" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} value={selectedDevice.brand} readOnly />
                                                    <label htmlFor="modele" className="text-sm font-medium text-gray-700">Modele :</label>
                                                    <input type="text" value={selectedDevice.model} className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} readOnly />
                                                </div>
                                                <div className="w-1/3 pr-2 flex flex-col">
                                                    <label htmlFor="newIMEI" className="text-sm font-medium text-gray-700">Num de série / IMEI de l'appareil endommagé :</label>
                                                    <input type="text" value={selectedDevice.imei} name="newIMEI" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} readOnly />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="flex justify-center">
                                                <div>
                                                    <button type="reset" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-3 rounded-lg mr-4">Annuler</button>
                                                    <button className="bg-orange-600 text-white px-4 py-3 rounded-lg">Valider</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000005c]">
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                        <h2 className="font-bold mb-4">Ticket d'achat SAV</h2>
                        <div className="mb-4">
                            <p><strong>IMEI:</strong> {ticketData.imei}</p>
                            <p><strong>Marque:</strong> {ticketData.marque}</p>
                            <p><strong>Modele:</strong> {ticketData.modele}</p>
                            <p><strong>Date:</strong> {ticketData.date}</p>
                            <p><strong>Prix:</strong> {ticketData.prix}</p>
                        </div>
                        <div id="impBtn" className="flex justify-center">
                        
                           <button onClick={toPrint} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Imprimer</button>
           
                            <button onClick={() => setShowTicket(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Fermer</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
