import { useEffect, useState } from "react";
import { Code2, Shield, Smartphone, Terminal } from "lucide-react";
import { Infocard } from "../components/Infocard";
import { SpeakerCard } from "../components/SpeakerCard";
import WorkshopCard from "../components/ui/WorkshopCard";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";

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

export default function Workshop() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [workshops, setWorkshops] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const response = await fetch(`${apiUrl}/events`);
                const data = await response.json();

                // Ambil semua event yang memiliki kategori "Workshop"
                const filteredData = data.filter((event: any) =>
                    event.category?.name?.toLowerCase().includes("workshop")
                );

                setWorkshops(filteredData);
            } catch (error) {
                console.error("Gagal mengambil data workshop:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    // Helper untuk menentukan icon Lucide berdasarkan judul sub-materi di database
    const getWorkshopIcon = (title: string) => {
        const name = title.toLowerCase();
        if (name.includes("mobile") || name.includes("android") || name.includes("ios")) return <Smartphone size={60} />;
        if (name.includes("cyber") || name.includes("security") || name.includes("hacker")) return <Shield size={60} />;
        if (name.includes("ai") || name.includes("intelligence") || name.includes("data")) return <Code2 size={60} />;
        return <Terminal size={60} />; // Icon cadangan jika judulnya di luar dugaan
    };

    // Ambil info gabungan nama-nama workshop untuk ditaruh di teks deskripsi atas
    const workshopThemes = workshops.map(w => w.name).join(", ");
    
    // Kumpulkan semua pembicara dari seluruh event workshop tanpa ada yang duplikat
    const allSpeakers = workshops.reduce((acc: any[], current) => {
        current.speakers?.forEach(spk => {
            if (!acc.some(item => item.id === spk.id)) {
                acc.push(spk);
            }
        });
        return acc;
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-500">Memuat info workshop...</div>;
    if (workshops.length === 0) return <div className="p-10 text-center text-gray-500 italic">Belum ada jadwal Workshop aktif di database.</div>;

    return (
        <div>
            <div className="space-y-10 p-10">
                <Infocard
                    title='IT WORKSHOP' // JUDUL MANUAL STATIS
                    description={`Workshop INVOFEST kali ini hadir dengan fokus materi pilihan terupdate yaitu: "${workshopThemes}". Didesain khusus untuk membekali talenta muda agar siap bertransformasi serta menguasai alat-alat mutakhir di industri digital.`}
                    image='https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png'
                    variant='left'
                    buttontext='Daftar Sekarang'
                    buttonprops={{
                        onClick: () => {
                            const target = document.getElementById("pelaksanaan-workshop");
                            target?.scrollIntoView({ behavior: "smooth" });
                        },
                        variant: "primary",
                        className: "shadow-lg"
                    }}
                />
            </div>

            <div className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                <div className="px-6 md:px-24 py-10 text-center md:text-left">
                    <h2 className="text-center text-4xl md:text-6xl font-semibold text-red-900 mb-4">Tentang IT Workshop</h2>
                    <p className="text-gray-700 leading-relaxed text-base md:text-xl font-normal text-center max-w-4xl mx-auto">
                        Rangkaian kelas intensif {workshopThemes} didesain khusus bagi para digital natives yang berada di persimpangan inovasi teknologi masa kini. Peserta diajak langsung menyelami materi melalui sesi inspiratif, pengenalan konsep mendalam, dan praktik langsung (*hands-on coding*) bersama para pakar berpengalaman di bidangnya.
                    </p>
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>
            </div>

            <h2 className="text-center text-3xl md:text-5xl p-10 font-semibold text-red-900">Temui Pembicara Khusus Kami</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-24 py-10 max-w-6xl mx-auto'>
                {allSpeakers.length > 0 ? (
                    allSpeakers.map((speaker) => (
                        <SpeakerCard
                            key={speaker.id}
                            imageUrl={speaker.image || 'https://placehold.co/300'}
                            name={speaker.name}
                            role={speaker.role}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 italic">Pembicara workshop segera diumumkan.</p>
                )}
            </div>

            <div id="pelaksanaan-workshop" className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                <div>
                    <h2 className="text-center text-3xl md:text-6xl font-semibold text-red-900 mb-4 p-5">Pelaksanaan IT Workshop</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-24 py-10 max-w-6xl mx-auto">
                        {workshops.map((w) => (
                            <div key={w.id} className="flex justify-center w-150">
                                <WorkshopCard
                                    icon={getWorkshopIcon(w.name)} // Icon berubah otomatis menyesuaikan nama materi di DB!
                                    title={w.name} // Judul dinamis dari DB
                                    date={new Date(w.dateEvent).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} // Format tanggal Indonesia
                                    time="08.00 WIB - 16.30 WIB"
                                    location={w.location} // Lokasi lab dinamis dari DB
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>
            </div>

            <FrequentlyAskedQuestion />
        </div>
    );
}