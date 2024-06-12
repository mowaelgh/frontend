export default function SearchResult({ action, data }) {
    const remainingWarranty = Math.max(data.guarantee - Math.floor((Date.now() - new Date(data.purchase_date).getTime()) / (1000 * 60 * 60 * 24 * 30)), 0);

    return (
        <div className="p-4 bg-white rounded-lg flex flex-col gap-10  justify-center items-center">
            <h2 className="text-2xl">information produits</h2>
            <div className="flex flex-col justify-end items-center gap-3">
                <hr className="w-20 border-2 border-gray-600" />
                <div className="flex flex-col">
                    <p>Etat: <b>{data.status}</b></p>
                    <p>Date d'achat: <b>{data.purchase_date}</b></p>
                    <p>Durée de garantie: <b>{data.guarantee} <span>mois</span></b></p>
                    <p>Reste de la durée de garantie: <b>{remainingWarranty} <span>mois</span></b></p>
                    <p>Nombre de retour SAV: <b>{data.nbRetourSav}</b></p>
                    <p>Terminal Assuré: <b>{data.terminal}</b></p>
                </div>
                <hr className="w-20 border-2 border-gray-600" />
            </div>
            <div className="flex justify-center">
                <button onClick={() => action()} className="bg-green-500 px-4 py-2.5 rounded-lg  text-white text-sm font-bold">Creer Fichier</button>
            </div>
        </div>

    )
}