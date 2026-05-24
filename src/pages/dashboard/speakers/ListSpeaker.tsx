import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "../../../components/ui/ListItem";

interface SpeakerType {
    id: number;
    name: string;
    role: string;
    image: string;
    events?: any[]; 
}

export default function Listspeaker() {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
    const [speakers, setSpeakers] = useState<SpeakerType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Perbaikan 1: Hapus parameter (id: number) karena ini untuk mengambil semua data
    const fetchSpeakers = async () => {
        try {
            // Perbaikan 2: Ubah URL endpoint sesuai dengan API get all milikmu (biasanya tanpa /:id)
            const response = await fetch(`${apiUrl}/speakers`);
            const data = await response.json();
            setSpeakers(data);
        } catch (error) {
            console.error("Gagal mengambil data speaker:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpeakers(); // Sekarang aman dipanggil tanpa argumen
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus narasumber ini?")) {
            try {
                const response = await fetch(`${apiUrl}/speakers/${id}`, {
                    method: "DELETE",
                });
                
                const result = await response.json();

                if (response.ok) {
                    alert(result.message || "Speaker berhasil dihapus");
                    fetchSpeakers(); // Sekarang aman dipanggil tanpa argumen
                } else {
                    alert(result.message || "Gagal menghapus speaker");
                }
            } catch (error) {
                console.error("Error delete speaker:", error);
            }
        }
    };

    return (
        <div className="p-5">
            <h2 className="font-semibold text-xl mb-2">Ini Adalah Laman List Speaker</h2>
            <p className="text-gray-500 mb-5">Semua data narasumber ada disini!</p>

            {loading ? (
                <p className="text-gray-600">Memuat data narasumber...</p>
            ) : speakers.length === 0 ? (
                <p className="text-gray-500 italic">Belum ada data narasumber di database.</p>
            ) : (
                <div className="flex flex-col gap-4 max-w-3xl">
                    {speakers.map((speaker) => (
                        <div 
                            key={speaker.id} 
                            className="flex items-center justify-between p-3 border rounded-lg bg-[#3B0A0A] border-[#5A1515]/60 shadow-sm gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <img 
                                    src={speaker.image || "https://placehold.co/100"} 
                                    alt={speaker.name} 
                                    className="w-12 h-12 rounded-full object-cover border bg-gray-100"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/100";
                                    }}
                                />
                                
                                <div>
                                    <ListItem title={speaker.name} />
                                    <p className="text-xs text-gray-500 mt-0.5 border-b max-w-100">{speaker.role}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <Link 
                                    to={`/dashboard/speaker/editspeaker/${speaker.id}`}
                                    className="px-3 py-1 bg-[#2B0505] text-[#F5EAEA] text-sm rounded hover:bg-[#4A0F0F] transition border border-[#5A1515]/60"
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(speaker.id)}
                                    className="px-3 py-1 bg-[#4A0F0F] text-white text-sm rounded hover:bg-[#5A1515] transition border border-[#5A1515]/60"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="py-5">
                <div className="flex justify-center p-3 bg-[#2B0505] max-w-50 rounded-lg text-[#F5EAEA] hover:bg-[#4A0F0F] transition ease-in duration-75 text-center border border-[#5A1515]/60">
                    <Link to="/dashboard/speaker/create" className="w-full">Buat Narasumber baru</Link>
                </div>
            </div>
        </div>
    );
}