import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom"; // Tambahkan untuk navigasi halaman
import { useState } from "react"; // Untuk status tombol loading
import Forminput from "../../../components/Forminput";
import Button from "../../../components/ui/Button";

type FormData = {
    judul: string;
}

const schema = z.object({
    judul: z.string().min(1, "Nama kategori wajib diisi")
});

export default function CreateCategory() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // Jalur eksekusi simpan data ke backend
    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            // Sesuaikan URL-nya jika nanti sudah pakai environment variable (.env)
            const response = await fetch(`${apiUrl}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Ketik 'name' sebagai key-nya karena backend menerima property 'name'
                body: JSON.stringify({ name: data.judul }), 
            });

            let result: any = null;
            try {
                result = await response.json();
            } catch {
                // kalau backend tidak mengirim JSON
                const txt = await response.text();
                result = { message: txt };
            }

            if (response.ok) {
                alert(result?.message || "Kategori baru sukses dibuat!");
                navigate("/dashboard/category/listcategory"); // Balik ke laman daftar kategori
            } else {
                console.error("[CreateCategory] HTTP", response.status, result);
                alert(`Gagal membuat kategori (HTTP ${response.status}).\n${result?.message || "Tidak ada detail error dari backend"}`);
            }
        } catch (error) {
            console.error("Error create category:", error);
            alert("Terjadi kesalahan koneksi ke server backend");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-5"> {/* Sedikit diturunkan padding horizontalnya agar tidak terlalu menjepit di layar standar */}
            <div className="flex flex-col text-center p-5">
                <h1 className="font-semibold text-4xl text-[#2B0505]">Create new category</h1>
                <p className="text-gray-600">Silahkan isi semua data dengan benar</p>
            </div>
            <div className="flex justify-center max-w-lg mx-auto gap-6 mt-4">

                <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F5EAEA] rounded-lg p-10 w-full shadow-sm border border-[#2B0505]/15">
                    <Forminput
                        label="Masukan nama kategori"
                        tipe="text"
                        name="judul"
                        register={register}
                        error={errors.judul?.message}
                        placeholder="isi kategori disini"
                    />

                    <div className="flex justify-center mt-6">
                        {/* Ubah label tombol secara dinamis saat sedang memproses request */}
                        <Button 
                            label={isSubmitting ? "Sedang Menyimpan..." : "Buat Category"} 
                            variant="primary" 
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};