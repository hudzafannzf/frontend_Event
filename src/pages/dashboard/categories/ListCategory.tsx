import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "../../../components/ui/ListItem";

interface CategoryType {
    id: number;
    name: string;
    createdAt?: string;
}

export default function Listcategory() {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 1. Ambil data dari backend
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Gagal mengambil kategori:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // 2. Fungsi Hapus Kategori
    const handleDelete = async (id : number) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus kategori ini?")) {
            try {
                const response = await fetch(`${apiUrl}/categories/${id}`, {
                    method: "DELETE",
                });
                
                const result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    // Refresh data di layar setelah berhasil dihapus
                    fetchCategories(); 
                } else {
                    alert(result.message); // Akan memunculkan peringatan jika kategori sedang dipakai di Event
                }
            } catch (error) {
                console.error("Gagal menghapus kategori:", error);
            }
        }
    };

    return (
        <div className="p-5">
            <h2 className="font-semibold text-xl mb-2">Ini Laman List Kategori</h2>
            <p className="text-gray-500 mb-5">Daftar kategori event yang tersimpan di database.</p>

            {loading ? (
                <p className="text-gray-600">Memuat kategori...</p>
            ) : categories.length === 0 ? (
                <p className="text-gray-500 italic">Belum ada data kategori.</p>
            ) : (
                // 3. Render data dinamis menggunakan .map()
                <div className="flex flex-col gap-4 max-w-2xl">
                    {categories.map((category) => (
                        <div 
                            key={category.id} 
                            className="flex items-center justify-between p-3 border rounded-lg bg-[#3B0A0A] border-[#5A1515]/60 shadow-sm"
                        >
                            <div className="flex-1">
                                {/* Menggunakan ListItem bawaanmu (tetap) */}
                                <ListItem title={category.name} />
                            </div>
                            
                            {/* Tombol Aksi: Edit & Hapus */}
                            <div className="flex gap-2">
                                <Link 
                                    to={`/dashboard/category/editcategory/${category.id}`}
                                    className="px-3 py-1 bg-[#2B0505] text-[#F5EAEA] text-sm rounded hover:bg-[#4A0F0F] transition border border-[#5A1515]/60"
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(category.id)}
                                    className="px-3 py-1 bg-[#4A0F0F] text-white text-sm rounded hover:bg-[#5A1515] transition border border-[#5A1515]/60"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tombol Buat Kategori Baru */}
            <div className="py-5">
                <div className="flex justify-center p-3 bg-[#2B0505] max-w-50 rounded-lg text-[#F5EAEA] hover:bg-[#4A0F0F] transition ease-in duration-75 text-center border border-[#5A1515]/60">
                    <Link to="/dashboard/category/create" className="w-full">Buat Category baru</Link>
                </div>
            </div>
        </div>
    );
}