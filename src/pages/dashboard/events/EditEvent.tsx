import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Interface untuk tipe data
interface CategoryOption { id: number; name: string; }
interface SpeakerOption { id: number; name: string; role: string; }

export default function EditEvent() {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // State Form
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [dateEvent, setDateEvent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [selectedSpeakerIds, setSelectedSpeakerIds] = useState<number[]>([]);

    // State Opsi Dinamis & Loading
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [speakersList, setSpeakersList] = useState<SpeakerOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // 1. Ambil data Opsi (Kategori & Speakers) dan Detail Event sekaligus
                const [resCat, resSpk, resEvt] = await Promise.all([
                    fetch(`${apiUrl}/categories`),
                    fetch(`${apiUrl}/speakers`),
                    fetch(`${apiUrl}/events/${id}`)
                ]);

                const cats = await resCat.json();
                const spks = await resSpk.json();
                const evt = await resEvt.json();

                if (!resEvt.ok) throw new Error("Event tidak ditemukan");

                // 2. Isi State dengan data lama dari Database
                setCategories(cats);
                setSpeakersList(spks);
                
                setName(evt.name);
                setLocation(evt.location);
                setDescription(evt.description);
                setCategoryId(evt.categoryId.toString());
                
                // Format tanggal ISO (2026-05-22T00:00...) ke format HTML Input (YYYY-MM-DD)
                if (evt.dateEvent) {
                    const formattedDate = new Date(evt.dateEvent).toISOString().split('T')[0];
                    setDateEvent(formattedDate);
                }

                // Ambil hanya ID dari pembicara yang sudah terdaftar di event ini
                const currentSpeakerIds = evt.speakers.map((s: any) => s.id);
                setSelectedSpeakerIds(currentSpeakerIds);

            } catch (error) {
                console.error(error);
                alert("Gagal memuat data event");
                navigate("/dashboard/events/listevent");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id, navigate]);

    // Handle Checkbox Pembicara
    const handleSpeakerCheckbox = (speakerId: number) => {
        setSelectedSpeakerIds((prev) =>
            prev.includes(speakerId) ? prev.filter((id) => id !== speakerId) : [...prev, speakerId]
        );
    };

    // Handle Submit PUT
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSpeakerIds.length === 0) return alert("Pilih minimal satu pembicara!");

        setIsSubmitting(true);
        try {
            const response = await fetch(`${apiUrl}/events/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    location,
                    description,
                    dateEvent: new Date(dateEvent).toISOString(),
                    categoryId: Number(categoryId),
                    speakerIds: selectedSpeakerIds
                }),
            });

            if (response.ok) {
                alert("Event berhasil diperbarui!");
                navigate("/dashboard/events/listevent");
            } else {
                const res = await response.json();
                alert(res.message || "Gagal memperbarui event");
            }
        } catch (error) {
            alert("Terjadi kesalahan sistem");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="p-5 text-gray-500">Memuat data event...</div>;

    return (
        <div className="p-5">
            <h2 className="font-semibold text-xl mb-2 text-red-900">Edit Event</h2>
            <p className="text-gray-500 mb-6">Ubah detail kegiatan dan manajemen narasumber.</p>

            <form onSubmit={handleSubmit} className="max-w-xl bg-[#FEE3EC] p-6 border rounded-xl shadow-sm flex flex-col gap-4">
                
                {/* Nama Event */}
                <div>
                    <label className="block text-sm font-medium mb-1">Nama Event</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>

                {/* Dropdown Kategori */}
                <div>
                    <label className="block text-sm font-medium mb-1">Kategori</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500" required>
                        <option value="">-- Pilih Kategori --</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>

                {/* Lokasi & Tanggal */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Lokasi</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm bg-white outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tanggal</label>
                        <input type="date" value={dateEvent} onChange={(e) => setDateEvent(e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm bg-white outline-none" required />
                    </div>
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-sm font-medium mb-1">Deskripsi</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm bg-white outline-none h-24" required />
                </div>

                {/* Checkbox Pembicara */}
                <div>
                    <label className="block text-sm font-medium mb-2">Pilih Pembicara</label>
                    <div className="max-h-40 overflow-y-auto border rounded-lg p-3 flex flex-col gap-2 bg-gray-50">
                        {speakersList.map(spk => (
                            <label key={spk.id} className="flex items-center gap-3 text-sm cursor-pointer p-1 hover:bg-white rounded transition">
                                <input type="checkbox" checked={selectedSpeakerIds.includes(spk.id)}
                                    onChange={() => handleSpeakerCheckbox(spk.id)}
                                    className="w-4 h-4 text-blue-600" />
                                <div>
                                    <p className="font-medium">{spk.name}</p>
                                    <p className="text-xs text-gray-400">{spk.role}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tombol Simpan */}
                <div className="flex gap-3 mt-2">
                    <button type="submit" disabled={isSubmitting}
                        className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition text-sm font-semibold">
                        {isSubmitting ? "Menyimpan..." : "Update Event"}
                    </button>
                    <button type="button" onClick={() => navigate("/dashboard/events/listevent")}
                        className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition text-sm">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}