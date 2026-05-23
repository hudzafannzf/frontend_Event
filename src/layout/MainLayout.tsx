import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import FooterInfo from "../components/ui/FooterInfo";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />

            <main className="py-6">
                <Outlet />
            </main>

            <footer className=" bg-slate-100 text-center">
                <FooterInfo />
            </footer>
        </div>
    )
}