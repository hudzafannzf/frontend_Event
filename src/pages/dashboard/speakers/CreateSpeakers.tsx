import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom"; // Tambahkan untuk redirect
import { useState } from "react"; // Tambahkan untuk status loading teks tombol
import Forminput from "../../../components/Forminput";
import Button from "../../../components/ui/Button";

type FormData = {
    nama: string;
    role: string;
    foto: string
}

const schema = z.object({
    nama: z.string().min(1, "nama narasumber wajib di isi"),
    role: z.string().min(1, "role narasumber wajib di isi"),
    foto: z.string().min(1, "tolong input url foto narasumber"),
});

export default function CreateSpeakers() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // Fungsi onSubmit untuk menembak API Backend
    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`${apiUrl}/speakers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Sesuaikan key objek form (nama, foto) ke key database backend (name, image)
                body: JSON.stringify({
                    name: data.nama,
                    role: data.role,
                    image: data.foto
                }),
            });

            let result: any = null;
            try {
                result = await response.json();
            } catch {
                const txt = await response.text();
                result = { message: txt };
            }

            if (response.ok) {
                alert(result?.message || "Profil narasumber berhasil dibuat!");
                navigate("/dashboard/speaker/Listspeaker"); // Balik ke laman daftar speaker
            } else {
                console.error("[CreateSpeakers] HTTP", response.status, result);
                alert(`Gagal membuat narasumber (HTTP ${response.status}).\n${result?.message || "Tidak ada detail error dari backend"}`);
            }
        } catch (error) {
            console.error("Error create speaker:", error);
            alert("Terjadi kesalahan koneksi ke server backend");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-5">
            <div className="text-center mb-6">
                <h2 className="text-[#2B0505] text-4xl font-semibold">Create new Speakers</h2>
                <p className="text-gray-600">Buat profil narasumber baru</p>
            </div>
            <div className="flex justify-center">
                <div className="flex bg-[#F5EAEA] p-10 rounded-lg w-full max-w-md shadow-sm border border-[#2B0505]/15">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">

                        <Forminput
                            label="Masukan nama narasumber"
                            tipe="text"
                            name="nama"
                            register={register}
                            error={errors.nama?.message}
                            placeholder="masukan nama disini"
                        />

                        <Forminput
                            label="Masukan Role narasumber"
                            tipe="text"
                            name="role"
                            register={register}
                            error={errors.role?.message}
                            placeholder="masukan role disini"
                        />

                        <Forminput
                            label="Masukan url foto narasumber"
                            tipe="text"
                            name="foto"
                            register={register}
                            error={errors.foto?.message}
                            placeholder="letakan url foto disini"
                        />

                        <div className="flex justify-center mt-4">
                            {/* Properti disabled dihilangkan agar aman dari error type compiler Button milikmu */}
                            <Button 
                                label={isSubmitting ? "Sedang Menyimpan..." : "Buat speaker"} 
                                variant="primary" 
                            />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}