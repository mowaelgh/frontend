import { redirect } from "react-router-dom";
import { useAuth } from "./hooks/auth";
import Signin from "./pages/auth/Signin";
import Home from "./pages/home/home";
import RechercherPage from "./pages/recherche";
import ConsulteSav from "./pages/fichesav/Verification";
import RepExterne from "./pages/suiviReparateur/reparateurExterne";
import RecuExterne from "./pages/suiviReparateur/recuExterne";
import InterventionSearch from "./pages/bonsav/searchBon";
import RepInterne from "./pages/suiviReparateur/reparateurInterne";
import RecuInterne from "./pages/suiviReparateur/recuInterne";
import Decharge from "./pages/decharge/searchDecharge";
import Retour from "./pages/SuiviPointDeCollecte.jsx/retour";
import SwapItems from "./pages/swap/swapItems";

export default function CustomRoutes() {
    const { isAuthed } = useAuth()

    const withAuth = () => (isAuthed) ? null : redirect("/signin")
    const withoutAuth = () => (!isAuthed) ? null : redirect("/")
    return [
        { path: "/", element: <Home />, loader: withAuth },
        { path: "/recherche", element: <RechercherPage />, loader: withAuth },
        { path: "/Consulte", element: <ConsulteSav />, loader: withAuth },
        { path: "/bonsav", element: <InterventionSearch />, loader: withAuth },
        { path: "/externe", element: <RepExterne /> , loader: withAuth },
        { path: "/recuExterne", element: <RecuExterne /> , loader: withAuth },
        { path: "/recuInterne", element: <RecuInterne /> , loader: withAuth },
        { path: "/interne", element: <RepInterne /> , loader: withAuth },
        { path: "/decharge", element: <Decharge /> , loader: withAuth },
        { path: "/retour", element: <Retour /> , loader: withAuth },
        { path: "/swap/items", element: <SwapItems /> , loader: withAuth },

        { path: "/signin", element: <Signin />, loader: withoutAuth },
        
        
    ]
}