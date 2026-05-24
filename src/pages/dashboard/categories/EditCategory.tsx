import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCategory() {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
    // 1. Ambil ID dari parameter URL router
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 2. State untuk form nama kategori dan status loading
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // 3. Ambil data nama kategori lama dari backend saat komponen dimuat
    useEffect(() => {
        const fetchCategoryDetail = async () => {
            try {
                const response = await fetch(`${apiUrl}/categories`);
                if (!response.ok) {
                    throw new Error("Kategori gagal ditemukan");
                }
                const data = await response.json();
                setName(data.name); // Set nama lama ke dalam input form
            } catch (error) {
                console.error(error);
                alert("Gagal mengambil data kategori lama");
                navigate("/dashboard/category/listcategory"); // Lempar balik ke list jika error
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCategoryDetail();
    }, [id, navigate]);

    // 4. Fungsi penanganan submit form (Kirim data PUT)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            return alert("Nama kategori tidak boleh kosong!");
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${apiUrl}/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || "Kategori berhasil diperbarui!");
                navigate("/dashboard/category/listcategory"); // Kembali ke halaman daftar
            } else {
                alert(result.message || "Gagal memperbarui kategori");
            }
        } catch (error) {
            console.error("Error saat update kategori:", error);
            alert("Terjadi kesalahan sistem saat menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-5 text-gray-600">Memuat data kategori...</div>;
    }

    return (
        <div className="p-5">
            <h2 className="font-semibold text-xl mb-2">Edit Kategori</h2>
            <p className="text-gray-500 mb-5">Ubah nama kategori sesuai dengan kebutuhan kamu.</p>

            <form onSubmit={handleSubmit} className="max-w-md bg-white p-5 border rounded-xl shadow-sm">
                <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Kategori Baru
                    </label>
                    <input
                        id="categoryName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A0F0F]"
                        placeholder="Contoh: Expo, Workshop, dll."
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-[#2B0505] text-white rounded-lg hover:bg-[#4A0F0F] disabled:bg-gray-400 transition"
                    >
                        {isSubmitting ? "Menyimpan..." : "Perbarui Kategori"}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/category/listcategory")}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}