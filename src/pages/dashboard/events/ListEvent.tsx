import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "../../../components/ui/ListItem";

// 1. Definisikan struktur data Event dari Backend agar TypeScript tidak error
interface EventType {
    id: number;
    name: string;
    location: string;
    dateEvent: string;
    description: string;
    category?: {
        id: number;
        name: string;
    };
    speakers?: {
        id: number;
        name: string;
        role: string;
        image: string;
    }[];
}

export default function Listevent() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 2. Fungsi ambil data event dari backend
    const fetchEvents = async () => {
        try {
            const response = await fetch(`${apiUrl}/events`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Gagal mengambil data event:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // 3. Fungsi hapus event
    const handleDelete = async (id: number) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus event ini?")) {
            try {
                const response = await fetch(`${apiUrl}/events/${id}`, {
                    method: "DELETE",
                });
                const result = await response.json();

                if (response.ok) {
                    alert(result.message || "Event berhasil dihapus");
                    fetchEvents(); // Refresh data di layar
                } else {
                    alert(result.message || "Gagal menghapus event");
                }
            } catch (error) {
                console.error("Error delete event:", error);
            }
        }
    };

    return (
        <div className="p-5">
            <h2 className="font-semibold text-xl mb-2">Ini Halaman List Event</h2>
            <p className="text-gray-500 mb-5">Semua daftar acara dan informasi narasumber yang terdata.</p>

            {loading ? (
                <p className="text-gray-600">Memuat daftar event...</p>
            ) : events.length === 0 ? (
                <p className="text-gray-500 italic">Belum ada data event di database.</p>
            ) : (
                // 4. Render data Event secara dinamis
                <div className="flex flex-col gap-5 max-w-3xl">
                    {events.map((event) => (
                        <div 
                            key={event.id} 
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-xl bg-white shadow-sm gap-4"
                        >
                            <div className="flex flex-col gap-1.5 flex-1">
                                {/* Nama Event */}
                                <ListItem title={event.name} />
                                
                                {/* Detail Lokasi & Tanggal */}
                                <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                                    <span>📍 <strong>Lokasi:</strong> {event.location}</span>
                                    <span>📅 <strong>Tanggal:</strong> {new Date(event.dateEvent).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>

                                {/* Badge Kategori (Relasi One-to-Many) */}
                                <div className="mt-1">
                                    <span className="text-[11px] font-semibold bg-[#3B0A0A] text-[#F5EAEA] px-2.5 py-0.5 rounded-full border border-[#5A1515]/60">
                                        📁 {event.category?.name || "Tanpa Kategori"}
                                    </span>
                                </div>

                                {/* Daftar Foto Pembicara (Relasi Many-to-Many) */}
                                {event.speakers && event.speakers.length > 0 && (
                                    <div className="mt-2 flex items-center gap-1.5">
                                        <span className="text-xs text-gray-400">Pembicara:</span>
                                        <div className="flex -space-x-2">
                                            {event.speakers.map((spk) => (
                                                <img 
                                                    key={spk.id}
                                                    src={spk.image || "https://placehold.co/100"} 
                                                    alt={spk.name}
                                                    title={`${spk.name} (${spk.role})`} // Hover text nama pembicara
                                                    className="w-7 h-7 rounded-full object-cover border-2 border-white bg-gray-100"
                                                    onError={(e) => {(e.target as HTMLImageElement).src = "https://placehold.co/100"}}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Tombol Aksi */}
                            <div className="flex md:flex-col gap-2 justify-end items-end">
                                <Link 
                                    to={`/dashboard/events/editevent/${event.id}`}
                                    className="px-3 py-1 bg-[#2B0505] text-[#F5EAEA] text-sm rounded hover:bg-[#4A0F0F] transition border border-[#5A1515]/60 text-center w-20"
                                >
                                    Edit
                                </Link>
                                    <button 
                                    onClick={() => handleDelete(event.id)}
                                    className="px-3 py-1 bg-[#4A0F0F] text-white text-sm rounded hover:bg-[#5A1515] transition text-center w-20 border border-[#5A1515]/60"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tombol Buat Event Baru */}
            <div className="py-5">
                <div className="flex justify-center p-3 bg-[#2B0505] max-w-50 rounded-lg text-[#F5EAEA] hover:bg-[#4A0F0F] transition ease-in duration-75 text-center border border-[#5A1515]/60">
                    <Link to="/dashboard/events/create" className="w-full">Buat Events baru</Link>
                </div>
            </div>
        </div>
    );
}