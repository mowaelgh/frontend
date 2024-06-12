import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiViewBoard } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoAlert } from "react-icons/go";

import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";

let menus = [
    { name: "Recherche", link: `/recherche`, icon: CiSearch },
    { name: "Consulter Fiche SAV", link: `/consulte`, icon: CiViewBoard },
    { name: "Consulter Fiche Sinistre", link: `/sinistre`, icon: CiViewBoard },
    { name: "Consulter bon SAV", link: `/`, icon: CiViewBoard },
    { name: "Recherche Decharge", link: `/decharge`, icon: CiSearch },
    {
        name: "Suivi point de collecte",
        link: `#`,
        icon: IoIosList,
        haveChildren: true,
        children: [
            { name: "Retour Entrepot Terminaux SWAP", link: "/retour" },
        ]
    },
    {
        name: "Go for Swap",
        link: `#`,
        icon: IoIosList,
        haveChildren: true,
        children: [
            { name: "Liste des Terminaux", link: "/swap/items" },
            { name: "Liste des Terminaux Assurés", link: "" }
        ]
    },
    { name: "Suivi Fiche Sinistre", link: `/`, icon: CiViewBoard },
    {
        name: "Suivi Retour Réparateurs",
        link: `/reparateur`,
        icon: IoIosList,
        haveChildren: true,
        children: [
            { name: "Expedier reparateur interne", link: "/interne" },
            { name: "Expedier reparateur externe", link: "/externe" },
            { name: "Recu reparateur interne", link: "/recuInterne" },
            { name: "Recu reparateur externe", link: "/recuExterne" },
        ]
    },
    { name: "Notifications", link: `/`, icon: IoMdNotificationsOutline },
    { name: "Alerts", link: `/`, icon: GoAlert },
];

const SideMenu = ({ open }) => {
    const [openSub, setOpenSub] = useState(-1);

    const openSubMenu = (i) => {
        setOpenSub(i === openSub ? -1 : i);
    };

    return (
        <>
            {menus?.map((menu, i) => {
                if (menu.haveChildren && open) {
                    return (
                        <div key={i} className="p-2 hover:bg-orange-300 rounded-md">
                            <div
                                onClick={() => openSubMenu(i)}
                                className="no-underline flex mb-2 items-center text-sm gap-2 text-black font-medium "
                            >
                                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                <h2
                                    // style={{ transitionDelay: `${i + 3}00ms` }}
                                    className={`whitespace-pre text-sm text-black }`}
                                >
                                    {menu?.name}
                                </h2>
                                <div>
                                    <svg
                                        className="w-6 h-6 text-black"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 9-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {openSub === i && (
                                <div className="px-6">
                                    <ul>
                                        {menu.children.map((e, ii) => {
                                            return (
                                                <Link
                                                    to={e?.link}
                                                    key={ii}
                                                    className="no-underline flex items-center text-sm gap-2 text-black font-medium  hover:bg-orange-400 py-2 px-2 rounded-md"
                                                >
                                                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                                    {open && <h2 className={`whitespace-pre duration-500 text-sm text-black`}>{menu?.name}</h2>}
                                                </Link>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                } else {
                    return (
                        <Link
                            to={menu?.link}
                            key={i}
                            className="p-2 no-underline flex justify-start items-center text-sm gap-2 text-black font-medium  hover:bg-orange-300 rounded-md"
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            {open && <h2 className={`whitespace-pre duration-500 text-sm text-black`}> {menu?.name} </h2>}

                        </Link>
                    );
                }
            })}
        </>
    );
};

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-black p-5 flex justify-between items-center px-4">
                <div className="flex items-center gap-5">
                    <img src="/assets/img/logo1.png" alt="" className="w-36 h-16" />
                    <SlArrowLeft
                        className="w-4 h-4 text-white cursor-pointer ml-2" // Added margin-left
                        onClick={toggleSidebar}
                    />
                </div>
                <div className="flex gap-5">

                    <Link to={"/"}>
                        <svg
                            className="w-9 h-9 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                            />
                        </svg>
                    </Link>

                    <svg
                        className="w-9 h-9 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                        />
                    </svg>
                    <svg
                        className="w-9 h-9 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                </div>
            </div>
            <div className="w-full flex-1 flex">
                <div className={`p-2 shadow-lg border-r-2 ${!sidebarOpen && 'w-16'}`}>
                    <SideMenu open={sidebarOpen} />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-2">{children}</div>
                    <div className="p-3 bg-black text-white flex justify-between">
                        <p>
                            copyright &copy; <b className="text-orange-600">Billcom Consulting</b>
                        </p>
                        <div className="flex gap-2">
                            <svg
                                className="w-6 h-6 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                className="w-6 h-6 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                className="w-6 h-6 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                                    clipRule="evenodd"
                                />
                                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
