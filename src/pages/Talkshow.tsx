import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Clock, Building } from "lucide-react";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";
import Infocard from "../components/Infocard";
import { SpeakerCard } from "../components/SpeakerCard";
import Pelaksanaansimple from "../components/ui/Pelaksanaansimple";

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

export default function Talkshow() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [talkshowData, setTalkshowData] = useState<EventType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTalkshow = async () => {
            try {
                const response = await fetch(`${apiUrl}/events`);
                const data = await response.json();

                // Cari event yang memiliki kategori "Talkshow"
                const findTalkshow = data.find((event: any) => 
                    event.category?.name?.toLowerCase().includes("talkshow")
                );

                if (findTalkshow) {
                    setTalkshowData(findTalkshow);
                }
            } catch (error) {
                console.error("Gagal mengambil data talkshow:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTalkshow();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-500">Memuat info talkshow...</div>;
    if (!talkshowData) return <div className="p-10 text-center text-gray-500 italic">Belum ada jadwal Talkshow aktif di database.</div>;

    return (
        <div>
            <div className="space-y-10 p-10">
                <Infocard
                    title='IT TALKSHOW'
                    description={`Talkshow berskala nasional dengan tema resmi: “${talkshowData.name}.” ${talkshowData.description}`}
                    image='https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png'
                    variant='left'
                    buttontext='Daftar Sekarang'
                    buttonprops={{
                        onClick: () => alert(`Terima kasih! Pendaftaran untuk ${talkshowData.name} berhasil.`),
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
                    <h2 className="text-center text-4xl md:text-6xl font-semibold text-red-900 mb-4 uppercase">
                        Tentang IT Talkshow
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-base md:text-xl font-normal text-center max-w-4xl mx-auto">
                        Seiring perkembangan teknologi digital, acara interaktif bertajuk “{talkshowData.name}” ini dirancang untuk menggali perspektif baru secara mendalam. {talkshowData.description}
                    </p>
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>
            </div>

            <h2 className="text-center text-3xl md:text-5xl p-10 font-semibold text-red-900">
                Temui Pembicara Khusus Kami
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-16 py-10 max-w-7xl mx-auto'>
                {talkshowData.speakers && talkshowData.speakers.length > 0 ? (
                    talkshowData.speakers.map((speaker) => (
                        <SpeakerCard
                            key={speaker.id}
                            imageUrl={speaker.image || 'https://placehold.co/300'} // Foto Dinamis
                            name={speaker.name} // Nama Dinamis
                            role={speaker.role} // Jabatan/Instansi Dinamis
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 italic">Pembicara talkshow akan segera diumumkan.</p>
                )}
            </div>

            <div className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                <h2 className="text-center text-red-900 text-3xl md:text-5xl font-semibold p-10">
                    Pelaksanaan IT Talkshow
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-24 py-10 max-w-3xl mx-auto">
                    <Pelaksanaansimple
                        icon={<CalendarDays size={18} />}
                        text={new Date(talkshowData.dateEvent).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    />

                    <Pelaksanaansimple
                        icon={<Clock size={18} />}
                        text="08.00 WIB - 12.00 WIB"
                    />

                    <Pelaksanaansimple
                        icon={<MapPin size={18} />}
                        text={talkshowData.location}
                    />

                    <Pelaksanaansimple
                        icon={<Building size={18} />}
                        text="Universitas Harkat Negeri"
                    />
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>
            </div>

            <FrequentlyAskedQuestion />
        </div>
    );
}