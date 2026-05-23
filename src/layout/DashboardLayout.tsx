import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { HomeIcon, SquarePlus } from "lucide-react";

export default function DashboardLayout() {
    const logout = useAuthStore((state: { logout: any; }) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        navigate("/login");
    }

    return (
        <div className="flex min-h-screen">

            {/* kiri (posisi tetap di sebelah kiri) */}
            <div className="min-h-screen bg-[#2B0505] w-64 flex flex-col justify-between p-5">
                {/* satu */}
                <div className="border-b border-white/10 py-4">
                    <h1 className="text-[#F5EAEA] text-2xl font-semibold tracking-tight">Invofest Dashboard</h1>
                </div>

                {/* dua */}
                <div>
                    <nav className="flex flex-col gap-5">
                        <Link to="/dashboard" className="p-4 text-[#F5EAEA]/80 text-lg hover:bg-[#4A0F0F] hover:text-white rounded-lg transition ease-in duration-150 flex items-center gap-3">
                            <span>
                                <HomeIcon size={18} />
                            </span>Dashboard
                        </Link>
                        <Link to="/dashboard/category/listcategory" className="p-4 text-[#F5EAEA]/80 text-lg hover:bg-[#4A0F0F] hover:text-white rounded-lg transition ease-in duration-150 flex items-center gap-3">
                            <span>
                                <SquarePlus size={18} />
                            </span>Kategori
                        </Link>
                        <Link to="/dashboard/events/listevent" className="p-4 text-[#F5EAEA]/80 text-lg hover:bg-[#4A0F0F] hover:text-white rounded-lg transition ease-in duration-150 flex items-center gap-3">
                            <span>
                                <SquarePlus size={18} />
                            </span>Events
                        </Link>
                        <Link to="/dashboard/speaker/listspeaker" className="p-4 text-[#F5EAEA]/80 text-lg hover:bg-[#4A0F0F] hover:text-white rounded-lg transition ease-in duration-150 flex items-center gap-3">
                            <span>
                                <SquarePlus size={18} />
                            </span>Pembicara
                        </Link>
                    </nav>
                </div>

                {/* tiga */}
                <div className="bg-[#4A0F0F] p-4 w-full text-white text-center rounded-lg cursor-pointer hover:bg-[#5A1515] transition">
                    <button onClick={handleLogout} className="w-full">Logout</button>
                </div>
            </div>

            {/* kanan */}
            <div>
                <Outlet />
            </div>
        </div>
    )
}