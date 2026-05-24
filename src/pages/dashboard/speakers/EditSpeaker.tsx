import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditSpeaker() {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
    // 1. Ambil ID dari URL router
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 2. State untuk menampung input form narasumber
    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // 3. Ambil data lama pembicara dari backend berdasarkan ID
    useEffect(() => {
        const fetchSpeakerDetail = async () => {
            try {
                const response = await fetch(`${apiUrl}/speakers/${id}`);
                if (!response.ok) {
                    throw new Error("Data narasumber tidak ditemukan");
                }
                const data = await response.json();

                // Masukkan data lama ke dalam form input secara otomatis
                setName(data.name || "");
                setRole(data.role || "");
                setImage(data.image || "");
            } catch (error) {
                console.error(error);
                alert("Gagal mengambil data narasumber lama");
                navigate("/dashboard/speaker/Listspeaker"); // Lempar balik ke list jika terjadi error
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSpeakerDetail();
    }, [id, navigate]);

    // 4. Fungsi handle submit form untuk update data (PUT)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi sederhana sisi client
        if (!name.trim() || !role.trim() || !image.trim()) {
            return alert("Semua kolom (Nama, Role, dan Link Foto) wajib diisi!");
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${apiUrl}/speakers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, role, image }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || "Data narasumber berhasil diperbarui!");
                navigate("/dashboard/speaker/Listspeaker"); // Kembali ke halaman daftar speaker
            } else {
                alert(result.message || "Gagal memperbarui data narasumber");
            }
        } catch (error) {
            console.error("Error saat update speaker:", error);
            alert("Terjadi kesalahan sistem saat menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-5 text-gray-600">Memuat data narasumber...</div>;
    }

    return (
        <div className="p-5">
            <h2 className="font-semibold text-xl mb-2">Edit Narasumber</h2>
            <p className="text-gray-500 mb-5">Perbarui informasi profil narasumber atau pembicara event.</p>

            <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 border rounded-xl shadow-sm gap-4 flex flex-col">

                {/* Input Nama */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Contoh: Alex Mercer"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Input Role / Jabatan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role / Profesi
                    </label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Contoh: Senior 3D Modeler / Backend Engineer"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Input Link URL Foto Profil */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Link Foto Profil (Avatar)
                    </label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Contoh: https://images.com/avatar.jpg"
                        disabled={isSubmitting}
                    />

                    {/* Live Preview Foto Kecil biar keren */}
                    {image && (
                        <div className="mt-3 flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
                            <img src={image} alt="Preview" className="w-10 h-10 rounded-full object-cover border"
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/100" }} />
                            <span className="text-xs text-gray-400">Live Preview Foto</span>
                        </div>
                    )}
                </div>

                {/* Tombol Aksi */}
                <div className="flex gap-3 mt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 disabled:bg-gray-400 text-sm transition font-medium"
                    >
                        {isSubmitting ? "Menyimpan..." : "Perbarui Data"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/speaker/Listspeaker")}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}