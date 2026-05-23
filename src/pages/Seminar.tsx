import { useEffect, useState } from "react";
import { Building, CalendarDays, Clock, MapPin } from "lucide-react";
import Infocard from "../components/Infocard";
import SpeakerCard from "../components/SpeakerCard";
import Pelaksanaansimple from "../components/ui/Pelaksanaansimple";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";

// 1. Definisikan tipe data Event lengkap beserta relasi Speaker-nya
interface EventType {
    id: number;
    name: string;
    location: string;
    dateEvent: string;
    description: string;
    category?: {
        name: string;
    };
    speakers?: {
        id: number;
        name: string;
        role: string;
        image: string;
    }[];
}

export default function Seminar() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [seminarData, setSeminarData] = useState<EventType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // 2. Ambil data dari backend dan saring khusus kategori Seminar
    useEffect(() => {
        const fetchSeminar = async () => {
            try {
                const response = await fetch(`${apiUrl}/events`);
                const data = await response.json();

                // Cari event pertama yang memiliki kategori "Seminar"
                const findSeminar = data.find((event: any) =>
                    event.category?.name?.toLowerCase().includes("seminar")
                );

                if (findSeminar) {
                    setSeminarData(findSeminar);
                }
            } catch (error) {
                console.error("Gagal mengambil data seminar:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeminar();
    }, []);

    // Tampilkan indikator loading jika data sedang ditarik
    if (loading) return <div className="p-10 text-center text-gray-500">Memuat info seminar...</div>;

    // Tampilkan pesan jika di database admin belum ada event berkategori Seminar
    if (!seminarData) return <div className="p-10 text-center text-gray-500 italic">Belum ada jadwal Seminar aktif di database.</div>;

    return (
        <div>
            {/* Bagian Atas - Detail Dinamis dari Database */}
            <div className="space-y-10 p-10">
                <Infocard
                    title="IT SEMINAR" // Judul dikunci MANUAL statis sesuai maumu
                    // Tema/Nama Event diambil dari database, lalu digabung dengan deskripsi panjangnya
                    description={`Seminar Nasional Teknologi Informasi ini mengangkat tema "${seminarData.name}.” ${seminarData.description}`}
                    image='https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png'
                    variant='left'
                    buttontext='Daftar Sekarang'
                    buttonprops={{
                        onClick: () => alert(`Terima kasih! Pendaftaran untuk ${seminarData.name} berhasil.`),
                        variant: "primary",
                        className: "shadow-lg"
                    }}
                />
            </div>

            {/* Bagian Tengah - Deskripsi Detail */}
            <div className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                <div className="px-6 md:px-24 py-10 text-center md:text-left">
                    <h1 className='text-center text-3xl md:text-5xl font-semibold text-red-900 pt-5 uppercase'>
                        Tentang IT SEMINAR
                    </h1>
                    <p className='text-center text-base md:text-xl text-gray-700 leading-relaxed mt-6 font-normal max-w-4xl mx-auto'>
                        Seminar bertajuk “{seminarData.name}” hadir di tengah pesatnya kemajuan teknologi saat ini. {seminarData.description}
                    </p>
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>
            </div>

            <h2 className="text-center text-3xl md:text-5xl p-10 font-semibold text-red-900">
                Temui Pembicara Khusus Kami
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-6 md:px-24 py-10 max-w-4xl mx-auto'>
                {seminarData.speakers && seminarData.speakers.length > 0 ? (
                    seminarData.speakers.map((speaker) => (
                        <SpeakerCard
                            key={speaker.id}
                            imageUrl={speaker.image || 'https://placehold.co/300'} // URL Foto Dinamis
                            name={speaker.name} // Nama Pembicara Dinamis
                            role={speaker.role} // Perusahaan / Jabatan Dinamis
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 italic">Pembicara akan segera diumumkan.</p>
                )}
            </div>

            <div className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                <h2 className="text-center text-red-900 text-3xl md:text-5xl font-semibold p-5">
                    Pelaksanaan IT Seminar
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-24 py-10 max-w-3xl mx-auto">
                    {/* Format Tanggal Otomatis ke Bahasa Indonesia */}
                    <Pelaksanaansimple
                        icon={<CalendarDays size={18} />}
                        text={new Date(seminarData.dateEvent).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    />

                    {/* Lokasi Ruangan */}
                    <Pelaksanaansimple
                        icon={<MapPin size={18} />}
                        text={seminarData.location}
                    />

                    {/* Waktu Pelaksanaan */}
                    <Pelaksanaansimple
                        icon={<Clock size={18} />}
                        text="08.00 WIB - Selesai"
                    />

                    {/* Universitas / Gedung Induk */}
                    <Pelaksanaansimple
                        icon={<Building size={18} />}
                        text="Universitas Harkat Negeri"
                    />
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>
            </div>

            {/* FAQ Section */}
            <FrequentlyAskedQuestion />
        </div>
    );
}