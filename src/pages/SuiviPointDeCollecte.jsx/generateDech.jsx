import React from "react";
import axios from 'axios';


export default function GenerateDech() {
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