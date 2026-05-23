import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Forminput from "../../../components/Forminput";
import Button from "../../../components/ui/Button";

// Tipe data untuk daftar pilihan dinamis
interface CategoryOption { id: number; name: string; }
interface SpeakerOption { id: number; name: string; role: string; }

// 1. Tipe data form disesuaikan dengan skema database backend
type FormData = {
    name: string;
    categoryId: string; // Ditangkap sebagai string dulu dari <select>, lalu diconvert ke number
    location: string;
    dateEvent: string;
    description: string;
}

// 2. Schema Zod disesuaikan dengan key baru
const schema = z.object({
    name: z.string().min(1, "Nama kegiatan wajib diisi"),
    categoryId: z.string().min(1, "Silahkan pilih kategori kegiatan"),
    location: z.string().min(1, "Lokasi kegiatan wajib diisi"),
    dateEvent: z.string().min(1, "Tanggal pelaksanaan wajib diisi"),
    description: z.string().min(1, "Deskripsi kegiatan wajib diisi"),
});

export default function CreateEvent() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State untuk menyimpan opsi dinamis dari database
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [speakersList, setSpeakersList] = useState<SpeakerOption[]>([]);
    
    // State khusus menampung ID speaker yang dicentang oleh user (Many-to-Many)
    const [selectedSpeakerIds, setSelectedSpeakerIds] = useState<number[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // 3. Ambil data Kategori dan Pembicara saat halaman pertama kali dibuka
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [resCat, resSpk] = await Promise.all([
                    fetch(`${apiUrl}/categories`),
                    fetch(`${apiUrl}/speakers`)
                ]);
                const cats = await resCat.json();
                const spks = await resSpk.json();
                
                setCategories(cats);
                setSpeakersList(spks);
            } catch (error) {
                console.error("Gagal memuat opsi dropdown:", error);
            }
        };
        fetchOptions();
    }, []);

    // 4. Handle check / uncheck pada pilihan pembicara
    const handleSpeakerCheckbox = (speakerId: number) => {
        setSelectedSpeakerIds((prev) =>
            prev.includes(speakerId)
                ? prev.filter((id) => id !== speakerId) // Jika sudah ada, hapus (uncheck)
                : [...prev, speakerId] // Jika belum ada, tambahkan (check)
        );
    };

    // 5. Fungsi Submit Data Akhir ke Backend
    const onSubmit = async (data: FormData) => {
        if (selectedSpeakerIds.length === 0) {
            return alert("Pilih minimal satu pembicara untuk event ini!");
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${apiUrl}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    location: data.location,
                    description: data.description,
                    dateEvent: new Date(data.dateEvent).toISOString(), // Ubah format ke standar ISO DateTime Prisma
                    categoryId: Number(data.categoryId), // Convert string ke integer number
                    speakerIds: selectedSpeakerIds // Kirim array kumpulan ID [1, 2, 3]
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
                alert(result?.message || "Event baru berhasil dijadwalkan!");
                navigate("/dashboard/events/listevent");
            } else {
                console.error("[CreateEvent] HTTP", response.status, result);
                alert(`Gagal membuat event (HTTP ${response.status}).\n${result?.message || "Tidak ada detail error dari backend"}`);
            }
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Terjadi masalah koneksi ke server backend");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-5">
            <div className="text-center mb-6">
                <h2 className="text-[#2B0505] font-semibold text-4xl">Create new Event</h2>
                <p className="text-gray-600">Buat kegiatan baru dengan relasi data terintegrasi</p>
            </div>

            <div className="flex justify-center">
                <div className="flex bg-[#F5EAEA] p-8 rounded-xl w-full max-w-lg shadow-md border border-[#2B0505]/15">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">

                        {/* Input Nama Event */}
                        <Forminput
                            label="Nama Event"
                            tipe="text"
                            name="name"
                            register={register}
                            error={errors.name?.message}
                            placeholder="Contoh: Web Design Competition"
                        />

                        {/* Dropdown Dinamis Kategori (Pesanan Atasan) */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1.5">Kategori Event</label>
                            <select
                                {...register("categoryId")}
                                className="w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A0F0F]/40 text-sm border-[#2B0505]/15"
                            >
                                <option value="">-- Pilih Jenis Kategori --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>
                            )}
                        </div>

                        {/* Input Lokasi */}
                        <Forminput
                            label="Lokasi Tempat"
                            tipe="text"
                            name="location"
                            register={register}
                            error={errors.location?.message}
                            placeholder="Contoh: Gedung Aula Utama Lt. 3"
                        />

                        {/* Input Tanggal (Kita ganti tipenya jadi 'date' biar keluar kalender popup bawaan browser) */}
                        <Forminput
                            label="Tanggal Pelaksanaan"
                            tipe="date"
                            name="dateEvent"
                            register={register}
                            error={errors.dateEvent?.message}
                            placeholder=""
                        />

                        {/* Input Deskripsi */}
                        <Forminput
                            label="Deskripsi Kegiatan"
                            tipe="text"
                            name="description"
                            register={register}
                            error={errors.description?.message}
                            placeholder="Tuliskan detail singkat acara di sini..."
                        />

                        {/* Pilihan Checkbox Dinamis Pembicara/Speakers (Many-to-Many - Pesanan Atasan) */}
                        <div className="flex flex-col border-t pt-3 mt-1 border-[#2B0505]/15">
                            <label className="text-sm font-medium text-gray-700 mb-2">Pilih Narasumber / Pembicara</label>
                            {speakersList.length === 0 ? (
                                <p className="text-xs text-gray-500 italic">Belum ada data pembicara. Buat pembicara terlebih dahulu.</p>
                            ) : (
                                <div className="max-h-36 overflow-y-auto bg-white p-3 rounded-lg border flex flex-col gap-2">
                                    {speakersList.map((spk) => (
                                        <label key={spk.id} className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedSpeakerIds.includes(spk.id)}
                                                onChange={() => handleSpeakerCheckbox(spk.id)}
                                                className="w-4 h-4 text-[#2B0505] border-gray-300 rounded focus:ring-[#4A0F0F]/40"
                                            />
                                            <div>
                                                <span className="font-semibold">{spk.name}</span>
                                                <span className="text-gray-400 block">{spk.role}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tombol Buat Event */}
                        <div className="flex justify-center mt-4">
                            <Button label={isSubmitting ? "Sedang Menyimpan..." : "Buat Event"} variant="primary" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}