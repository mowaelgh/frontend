import React, { useState } from "react";
import axios from "axios";

export default function FicheIntervention({ data }) {
    
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

    // Check if the device is under warranty
    const isUnderWarranty = data.device.guarantee > 0;

    // Determine the warranty status
    const warrantyStatus = isUnderWarranty ? "oui" : "non";

    return (
        <div id="fichPrint" className="w-full bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <img src="/assets/img/logo1.png" alt="Logo" className="mr-4" style={{ width: "150px", height: "auto" }} />
                {/* Title */}
                <h2 style={{ width: "100%" }} className="font-bold text-center text-2xl flex-grow py-5">Fiche d'Intervention</h2>
            </div>
            {/* Num Recu */}
            <div className="flex justify-between mb-4">
                <p className="text-sm font-medium text-gray-700">
                    Num Recu : <span className="font-bold">{data.id}</span>
                </p>
                {/* Date and Boutique */}
                <div>
                    <p className="text-sm font-medium text-gray-700">Date : <span className="font-bold">{data.createdAt}</span></p>
                    <p className="text-sm font-medium text-gray-700">Boutique : <span className="font-bold">{data.userInfo}</span></p>
                </div>
            </div>
            {/* Informations client section */}
            <h2 className="font-bold mb-4">Informations client</h2>
            <div className="flex justify-between mb-4">
                {/* Left side */}
                <div className="w-1/2 pr-4">
                    <p className="text-sm font-medium text-gray-700">Nom : <span className="font-bold">{data.client.firstName}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num Cin/passeport : <span className="font-bold">{data.client.cin}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num Tel 1 : <span className="font-bold">{data.client.phoneNumber1}</span></p>
                </div>
                {/* Right side */}
                <div className="w-1/2 pl-4">
                    <p className="text-sm font-medium text-gray-700">Prénom : <span className="font-bold">{data.client.lastName}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num Tel 2 : <span className="font-bold">{data.client.phoneNumber2}</span></p>
                    <p className="text-sm font-medium text-gray-700">Email : <span className="font-bold">{data.client.email}</span></p>
                </div>
            </div>
            {/* Material section */}
            <h2 className="font-bold mb-4">Material</h2>
            <div className="flex justify-between mb-4">
                {/* Left side */}
                <div className="w-1/2 pr-4">
                    <p className="text-sm font-medium text-gray-700">Date d'achat : <span className="font-bold">{data.device.purchase_date}</span></p>
                    <p className="text-sm font-medium text-gray-700">Marque : <span className="font-bold">{data.device.brand}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num serie/IMEI : <span className="font-bold">{data.device.imei}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num Serie Batterie : <span className="font-bold">{data.device.batteryId}</span></p>
                    <p className="text-sm font-medium text-gray-700">Code de produit : <span className="font-bold">{}</span></p>
                    <p className="text-sm font-medium text-gray-700">Sous garantie : <span className="font-bold">{warrantyStatus}</span></p>
                </div>
                {/* Right side */}
                <div className="w-1/2 pl-4">
                    <p className="text-sm font-medium text-gray-700">Modèle : <span className="font-bold">{data.device.model}</span></p>
                    <p className="text-sm font-medium text-gray-700">Produit en service : <span className="font-bold"></span></p>
                    <p className="text-sm font-medium text-gray-700">Type de panne : <span className="font-bold">{data.pannes.join(", ")}</span></p>
                    <p className="text-sm font-medium text-gray-700">Etat terminal : <span className="font-bold"></span></p>
                    <p className="text-sm font-medium text-gray-700">Accessoires : <span className="font-bold">{data.accessoires.join(", ")}</span></p>
                </div>
            </div>
            {/* Signature section */}
            <div className="flex justify-between mb-4">
                {/* Client's signature */}
                <p className="text-sm font-medium text-gray-700 flex items-center">Signature Client :</p>
                {/* Responsable's signature */}
                <p className="text-sm font-medium text-gray-700 flex justify-end items-center">Signature Responsable :</p>
            </div>
            {/* Empty divs */}
            <div className="flex justify-between mb-4">
                {/* Empty div with flex start */}
                <div className="flex-start-box w-32 h-12 bg-white border border-black rounded"></div>
                {/* Empty div with flex end */}
                <div className="flex-end-box w-32 h-12 bg-white border border-black rounded"></div>
            </div>
            <div id="impBtn" className="flex justify-center mt-4">
                <button onClick={toPrint} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Imprimer</button>
            </div>
        </div>

    );
}