import React from "react";
import axios from 'axios';


export default function GenerateDech() {
    const toPrint = () => {
        axios.get('http://localhost:8080/api/print', {
            responseType: 'blob', // Important
        })
        .then(response => {
            // Create a blob from the response
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a link element
            const link = document.createElement('a');

            // Set the URL and filename
            link.href = window.URL.createObjectURL(blob);
            link.download = 'document.pdf';

            // Append the link to the body
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error generating the PDF', error);
        });
    };

    
    return (
       
        <div id="fichPrint" className="w-full bg-white p-4 rounded-lg">
             <div className="flex items-center justify-between mb-4">
        <img src="/assets/img/logo1.png" alt="Logo" className="mr-4" style={{ width: "150px", height: "auto" }} />
        {/* Title */}
        <h2 style={{ width: "100%" }} className="font-bold text-center text-2xl flex-grow py-5">Decharge d'envoi</h2>
            </div>
    <div className="flex justify-between mb-4">
        <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
                Ref decharge : <span className="font-bold">value</span>
            </p>
            <p className="text-sm font-medium text-gray-700 mb-2">
                Depart : <span className="font-bold">value</span>
            </p>
            <p className="text-sm font-medium text-gray-700 mb-2">
                Destination : <span className="font-bold">value</span>
            </p>
        </div>
        <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
                Date : <span className="font-bold">value</span>
            </p>
        </div>
    </div>
    <table className="mt-5 w-full border-collapse">
                        <tbody>
                            <tr className="bg-gray-200">
                                
                                
                                <td className="px-4 py-2 border text-center font-bold">Marque</td>
                                <td className="px-4 py-2 border text-center font-bold">Modele</td>
                                <td className="px-4 py-2 border text-center font-bold">N'Serie</td>
                               
                            </tr>
                            <tr>
                                
                                {[...Array(3)].map((_, index) => (
                                    <td key={index + 1} className="px-4 py-2 border text-center">Data {index + 1}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <div id="impBtn" className="flex justify-center mt-4">
                <button onClick={toPrint} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Imprimer</button>
            </div>
  </div>

    
    
    );
}