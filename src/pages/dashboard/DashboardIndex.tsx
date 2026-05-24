import { useEffect, useState } from "react";

export default function DashboardIndex() {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
    // 1. Siapkan state untuk menampung jumlah total data
    const [totalCategory, setTotalCategory] = useState(0);
    const [totalEvent, setTotalEvent] = useState(0);
    const [totalSpeaker, setTotalSpeaker] = useState(0);
    const [loading, setLoading] = useState(true);

    // 2. Ambil data dari backend saat halaman pertama kali dibuka
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Sesuaikan URL jika port backend kamu berbeda (misal: http://localhost:3000)
                const [resCategory, resEvent, resSpeaker] = await Promise.all([
                    fetch(`${apiUrl}/categories`),
                    fetch(`${apiUrl}/events`),
                    fetch(`${apiUrl}/speakers`)
                ]);

                const categories = await resCategory.json();
                const events = await resEvent.json();
                const speakers = await resSpeaker.json();

                // 3. Hitung total data menggunakan .length
                setTotalCategory(categories.length || 0);
                setTotalEvent(events.length || 0);
                setTotalSpeaker(speakers.length || 0);
            } catch (error) {
                console.error("Gagal mengambil data dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-5">
            <div className="mb-6">
                <h1 className="font-semibold text-2xl tracking-tight text-[#3d0000]">Halaman Dashboard</h1>
                <p className="text-[#000000]/70 mt-1">Ringkasan cepat data kategori, event, dan pembicara.</p>
            </div>

            {loading ? (
                <p className="text-gray-600 animate-pulse">Memuat data statistik...</p>
            ) : (
                // 4. Grid Tampilan Kartu Statistik (Stats Card)
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* Kartu Total Kategori */}
                    <div className="relative overflow-hidden p-5 bg-gradient-to-b from-[#3B0A0A] to-[#2B0505] border border-[#5A1515]/70 rounded-2xl shadow-sm">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,234,234,0.16),transparent_40%)]" />
                        <div className="relative">
                            <p className="text-sm font-medium text-[#F5EAEA]/90 uppercase tracking-wider">Total Kategori</p>
                            <p className="text-4xl font-bold text-[#F5EAEA] mt-2">{totalCategory}</p>
                        </div>
                    </div>

                    {/* Kartu Total Event */}
                    <div className="relative overflow-hidden p-5 bg-gradient-to-b from-[#3B0A0A] to-[#2B0505] border border-[#5A1515]/70 rounded-2xl shadow-sm">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,234,234,0.16),transparent_40%)]" />
                        <div className="relative">
                            <p className="text-sm font-medium text-[#F5EAEA]/90 uppercase tracking-wider">Total Event</p>
                            <p className="text-4xl font-bold text-[#F5EAEA] mt-2">{totalEvent}</p>
                        </div>
                    </div>

                    {/* Kartu Total Speakers */}
                    <div className="relative overflow-hidden p-5 bg-gradient-to-b from-[#3B0A0A] to-[#2B0505] border border-[#5A1515]/70 rounded-2xl shadow-sm">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,234,234,0.16),transparent_40%)]" />
                        <div className="relative">
                            <p className="text-sm font-medium text-[#F5EAEA]/90 uppercase tracking-wider">Total Speakers</p>
                            <p className="text-4xl font-bold text-[#F5EAEA] mt-2">{totalSpeaker}</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}