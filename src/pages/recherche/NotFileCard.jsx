import { useState } from "react";
import { AddInterventionStatus } from "../../hooks/api_inter_status";

export default function NotFileCard({ data }) {
    const [ov, setOV] = useState(0)
    const [intStatus, setIntStatus] = useState({})

    const moveBack = () => setOV(0)
    const moveNext = (e) => {
        setIntStatus(e)
        setOV(1)
    }

    const saveInvStatus = async (e) => {
        console.log(data);
        
        // return
        const r = await AddInterventionStatus({
            amount: e.amount,
            marque: intStatus.brand,
            modele: intStatus.model,
            newIMEI: data.imei,
            intervention_id: 502,
            local: data.boutique,
            createdAt: (new Date()),
        })
        const id = r.response.data.id
        setIntStatus({ ...intStatus, ...e, created_at: (new Date()).toDateString(), id })

        setOV(3)
    }

    return (
        <>
            {ov == 0 && <View1 data={data} onSubmit={moveNext} onCancel={() => null} />}
            {ov == 1 && <View2 data={intStatus} onSubmit={saveInvStatus} onCancel={moveBack} />}
            {ov == 3 && <View3 data1={data} data2={intStatus} />}
        </>

    );
}


const View1 = ({ data, onSubmit, onCancel }) => {
    const [selectedPanne, setSelectedPanne] = useState([]);

    const addToSecondBoxPanne = () => {
        const selectedOption = document.getElementById('panne').value;
        const r = selectedPanne.find((v) => v === selectedOption)
        if (r !== undefined) return
        setSelectedPanne([...selectedPanne, selectedOption]);
    };

    const handleNextClick = (e) => {
        e.preventDefault();

        const obj = Object.fromEntries(new FormData(e.currentTarget))
        let pannes = document.getElementsByName("panneList")[0].childNodes
        delete obj.panne;
        obj.panneList = Array.from(Array(pannes.length).keys()).map((x) => pannes[x].value).join(", ")

        obj.brand = data.brand;
        obj.model = data.model;
        obj.imei = data.imei;

        const confirmed = window.confirm("Are you sure you want to proceed?");
        if (confirmed) {
            onSubmit(obj);
        }
    };
    const removeFromSecondBoxPanne = () => {
        const updatedOptions = [...selectedPanne];
        updatedOptions.pop();
        setSelectedPanne(updatedOptions);
    };

    return (
        <div className="mt-4 w-full bg-white p-4 rounded-lg">
            <h2 className="font-bold mb-4">Informations client</h2>
            <form onSubmit={handleNextClick}>
                <div className="flex mb-4">
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="nom" className="text-sm font-medium text-gray-700">Nom :</label>
                        <input type="text" name="nom" id="nom" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="numTel1" className="text-sm font-medium text-gray-700">Num Tel 1 :</label>
                        <input type="text" name="numTel1" id="numTel1" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="numCin" className="text-sm font-medium text-gray-700">Num Cin/passeport :</label>
                        <input type="text" name="numCin" id="numCin" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="prenom" className="text-sm font-medium text-gray-700">Prénom :</label>
                        <input type="text" name="prenom" id="prenom" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="num2" className="text-sm font-medium text-gray-700">Num Tel 2 :</label>
                        <input type="text" name="numTel2" id="num2" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email :</label>
                        <input type="email" name="email" id="email" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>
                </div>
                <hr className="mb-4" />
                <h2 className="font-bold mb-4">Material</h2>
                <div className="flex mb-4 items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Marque: <span className="font-bold ml-10">{data.brand}</span></p>
                    <p className="text-sm font-medium text-gray-700 ">Num de serie/IMEI : <span className="font-bold ml-10">{data.imei}</span></p>
                </div>
                <div className="flex mb-4 items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 mr-2 ">Modèle: <span className=" p-1 font-bold ml-10">{data.model}</span></p>
                </div>

                <div className="flex mb-4 items-center justify-between">
                    <label htmlFor="panne" className="text-sm font-medium text-gray-700 mr-2" style={{ width: "150px" }}>Type de panne:</label>
                    <select id="panne" name="panne" multiple className="p-1 border rounded-lg mr-4 ml-3" style={{ width: "400px", height: "150px" }}>
                        <option value="Panne déconnexion">Probléme déconnexion</option>
                        <option value="Panne de port réseau">Probléme de port réseau</option>
                        <option value="Panne d'aliementation">Probléme d'aliementation</option>
                        <option value="Panne de port téléphonique">Probléme de port téléphonique</option>
                        <option value="Panne d'émission et/ou réception">Probléme d'émission et/ou réception</option>
                    </select>
                    <div className="flex flex-col items-center">
                        <a onClick={addToSecondBoxPanne} className="bg-gray-400 text-white px-2 py-2 rounded-lg mb-2 text-center cursor-pointer w-28">Ajouter</a>
                        <a onClick={removeFromSecondBoxPanne} className="bg-gray-400 text-white px-2 py-2 rounded-lg mb-2  text-center cursor-pointer w-28">Enlever</a>
                    </div>
                    <select name="panneList" multiple className="p-1 border rounded-lg ml-3" style={{ width: "400px", height: "150px" }}>
                        {selectedPanne.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex mb-4 items-center">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700 mr-2">Description de panne:</label>
                    <input type="text" name="description" id="description" className="mt-1 p-2 border rounded-lg" style={{ width: "200px" }} />
                </div>

                <div className="flex justify-end">
                    <div>
                        <button type="submit" className="bg-green-500 text-white px-4 py-3 rounded-lg">Remplacer</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
const View2 = ({ data, onSubmit, onCancel }) => {
    const sub = (e) => {
        e.preventDefault()
        const obj = Object.fromEntries(new FormData(e.currentTarget))
        onSubmit({ newIMEI: obj.newIMEI, amount: obj.amount })
    }
    return (
        <div className="mt-4 w-full bg-grey p-4 rounded-lg">
            <form onSubmit={sub}>
                <h2 className="font-bold mb-4">Materiel de Remplacement</h2>
                <div className="flex mb-4">
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="marque" className="text-sm font-medium text-gray-700">Marque :</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} value={data.brand} />
                        <label htmlFor="modele" className="text-sm font-medium text-gray-700">Modele :</label>
                        <input type="text" value={data.model} className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>
                    <div className="w-1/3 pr-2 flex flex-col">
                        <label htmlFor="imei" className="text-sm font-medium text-gray-700">Num de série / IMEI :</label>
                        <input type="text" name="newIMEI" className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                        <label htmlFor="amount" className="text-sm font-medium text-gray-700">Prix :</label>
                        <input type="text" name='amount' className="mt-1 p-2 w-full border rounded-lg" style={{ width: "80%" }} />
                    </div>

                </div>
                <hr />
                <div className="flex justify-center">
                    <div>
                        <button type="reset" onClick={onCancel} className="bg-red-500 text-white px-4 py-3 rounded-lg mr-4">Annuler</button>
                        <button className="bg-green-500 text-white px-4 py-3 rounded-lg">Valider</button>
                    </div>

                </div>

            </form>
        </div>


    )
}
const View3 = ({ data1, data2 }) => {
    console.log({ data1, data2 });
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
    // Check if the device is under warranty
    const isUnderWarranty = data1.guarantee > 0;

    // Determine the warranty status
    const warrantyStatus = isUnderWarranty ? "oui" : "non";

    return (
        <div id="fichPrint" className="w-full bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <img src="/assets/img/logoorange.png" alt="Logo" className="mr-4" style={{ width: "150px", height: "auto" }} />
                {/* Title */}
                <h2 style={{ width: "100%" }} className="font-bold text-center text-2xl flex-grow py-5">Fiche d'Intervention</h2>
            </div>
            {/* Num Recu */}
            <div className="flex justify-between mb-4">
                <p className="text-sm font-medium text-gray-700">
                    Num Recu : <span className="font-bold">{data2.id}</span>
                </p>
                {/* Date and Boutique */}
                <div>
                    <p className="text-sm font-medium text-gray-700">Date : <span className="font-bold">{new Date(data2.created_at).toLocaleDateString()}</span></p>
                    <p className="text-sm font-medium text-gray-700">Boutique : <span className="font-bold">{data1.boutique}</span></p>
                </div>
            </div>
            {/* Informations client section */}
            <h2 className="font-bold mb-4">Informations client</h2>
            <div className="flex justify-between mb-4">
                {/* Left side */}
                <div className="w-1/2 pr-4">
                    <p className="text-sm font-medium text-gray-700">Nom : <span className="font-bold">{data2.nom}</span></p>
                    <p className="text-sm font-medium text-gray-700">Prénom : <span className="font-bold">{data2.prenom}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num Cin/passeport : <span className="font-bold">{data2.numCin}</span></p>

                </div>
                {/* Right side */}
                <div className="w-1/2 pl-4">
                    <p className="text-sm font-medium text-gray-700">Num Tel 1 : <span className="font-bold">{data2.numTel1}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num Tel 2 : <span className="font-bold">{data2.numTel2}</span></p>
                    <p className="text-sm font-medium text-gray-700">Email : <span className="font-bold">{data2.email}</span></p>
                </div>
            </div>
            {/* Material section */}
            <h2 className="font-bold mb-4">Material</h2>
            <div className="flex justify-between mb-4">
                {/* Left side */}
                <div className="w-1/2 pr-4">
                    <p className="text-sm font-medium text-gray-700">Date d'achat : <span className="font-bold">{new Date(data1.purchase_date).toLocaleDateString()}</span></p>
                    {/* type */}
                    <p className="text-sm font-medium text-gray-700">Marque : <span className="font-bold">{data1.brand}</span></p>
                    <p className="text-sm font-medium text-gray-700">Modèle : <span className="font-bold">{data1.model}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num serie/IMEI : <span className="font-bold">{data1.imei}</span></p>

                </div>
                {/* Right side */}
                <div className="w-1/2 pl-4">
                    <p className="text-sm font-medium text-gray-700">Sous garantie : <span className="font-bold">{warrantyStatus}</span></p>
                    <p className="text-sm font-medium text-gray-700">Type de panne : <span className="font-bold">{(data1.pannes ?? []).join(", ")}</span></p>
                    <p className="text-sm font-medium text-gray-700">description de panne : <span className="font-bold">{data2.description}</span></p>
                </div>
            </div>
            <h2 className="font-bold mb-4">Terminal de Remplacement</h2>
            <div className="flex justify-between mb-4">
                {/* Left side */}
                <div className="w-1/2 pr-4">
                    <p className="text-sm font-medium text-gray-700">Marque : <span className="font-bold">{data2.brand}</span></p>
                    <p className="text-sm font-medium text-gray-700">Modèle : <span className="font-bold">{data2.model}</span></p>
                    <p className="text-sm font-medium text-gray-700">Num serie/IMEI : <span className="font-bold">{data2.newIMEI}</span></p>
                    <p className="text-sm font-medium text-gray-700">Prix : <span className="font-bold">{data2.amount}</span></p>
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
