import React from "react";
import Layout from "../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export default function SearchDecharge() {
    return (
        <Layout>
            <div className="mt-8 flex justify-center">
                <div className="w-full bg-white p-4 rounded-lg">
                    <h2 className="text-2xl font-bold">Recherche decharge</h2>
                    <div className="mt-4 flex items-center">
                        <input
                            type="text"
                            className="px-3 py-2 rounded-lg border border-gray-300 w-52" // Adjusted width to 52
                            placeholder="Search for decharge"
                        />
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}