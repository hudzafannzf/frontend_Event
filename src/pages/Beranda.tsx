import Eventcard from "../components/Eventcard";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";
import { Infocard } from "../components/Infocard";

export default function Beranda() {
    return (
        <div>
            <Infocard
                title='INVOFEST'
                description='Invofest (Informatics Vocational Festival) adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital.'
                image='https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png'
                variant='left'
                buttontext='INFO SELENGKAPNYA'
                buttonprops={{
                    onClick: () => alert("Daftar"),
                    variant: "primary",
                    className: "shadow-lg"
                }}
            />

            <div className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                <div className='px-45 pb-5 pt-5 font-semibold'>
                    <h3 className='text-4xl text-red-900'>Tentang INVOFEST</h3>
                    <p className='text-2xl text-gray-600'>Invofest 2025, yang diselenggarakan oleh sarjana terapan Teknik Informatika Universitas Harkat Negeri,
                        adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia
                        dalam menghadapi era digital.Invofest 2025 menghadirkan berbagai kegiatan menarik seperti kompetisi IT,
                        workshop IT, dan seminar nasional & talkshow dengan para ahli teknologi.</p>
                </div>

                <div className="px-55 pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <Eventcard
                            title="IT Seminar"
                            description="Seminar nasional ini membahas Human-AI Integration. yang membahas bagaimana kolaborasi antara manusia dan ai melalui proses yang terorganisir"
                            buttonText="INFO SELENGKAPNYA"
                            buttonProps={{ variant: "primary" }}
                        />

                        <Eventcard
                            title="IT Talkshow"
                            description="Talkshow Humanizing Technology yang membahas bagaimana efek adanya AI di antara manusia melalui percakapan yang santai"
                            buttonText="INFO SELENGKAPNYA"
                            buttonProps={{ variant: "primary" }}
                        />

                        <Eventcard
                            title="IT Competition"
                            description="Kompetisi From Creation to Innovation mengembangkan gagasan dan ide untuk membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang berkelanjutan."
                            buttonText="INFO SELENGKAPNYA"
                            buttonProps={{ variant: "primary" }}
                        />

                        <Eventcard
                            title='IT Workshop'
                            description='Workshop mengenai otomatisasi workflow dengan AI dan n8n'
                            buttonText='INFO SELENGKAPNYA'
                            buttonProps={{ variant: "primary" }}
                        />
                    </div>
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>
            </div>

            <div className="space-y-10 p-10">
                <Infocard
                    title='IT Seminar'
                    description='Seminar Nasional Teknologi Informasi ini mengangkat tema "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif.”Kami bertujuan untuk menggeser fokus dari ketakutan akan kompetisi menjadi eksplorasi peluang kolaborasi. Seminar ini akan mengupas tuntas bagaimana kita dapat merancang sistem, etika, dan lingkungan kerja di mana AI berfungsi sebagai mitra yang memperkuat kecerdasan, kreativitas, dan produktivitas manusia—bukan sebagai pengganti.'
                    image='https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png'
                    variant='left'
                    buttontext='DAFTAR IT SEMINAR'
                    buttonprops={{
                        onClick: () => alert("Daftar"),
                        variant: "primary",
                        className: "shadow-lg"
                    }}
                />
            </div>


            <div className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                {/* Khusus */}
                <div className="space-y-10 p-10">
                    <Infocard
                        title='IT Talkshow'
                        description='Talkshow berskala nasional: “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan.” Acara ini dirancang bukan untuk membahas teknologi sebagai entitas yang dingin dan terpisah, melainkan untuk menggali bagaimana kita dapat menanamkan nilai-nilai kemanusiaan—seperti empati, etika, dan kreativitas—ke dalam inti pengembangan AI. Kami akan mengupas tuntas visi masa depan di mana AI tidak menjadi pesaing, tetapi menjadi mitra kolaboratif yang memperkuat potensi unik manusia. Talkshow ini bertujuan untuk menginspirasi generasi muda dan para penggiat teknologi untuk tidak hanya menjadi pengguna, tetapi juga menjadi arsitek masa depan digital yang lebih manusiawi. Mari bergabung untuk meningkatkan pengetahuan, mengembangkan potensi diri, dan menjadi bagian dari dialog penting dalam membentuk era kolaborasi manusia dan AI.'
                        image='https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png'
                        variant='right'
                        buttontext='DAFTAR IT TALKSHOW'
                        buttonprops={{
                            onClick: () => alert("Daftar"),
                            variant: "primary",
                            className: "shadow-lg"
                        }}
                    />
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>

            </div>

            <div className="space-y-10 p-10">
                <Infocard
                    title='IT Workshop'
                    description='Workshop "AI for a Sustainable Future: The Role of Z Generation in the Digital Era” ini menjembatani antara potensi Generasi Z dan kekuatan AI untuk menciptakan masa depan yang berkelanjutan. Peserta akan dibekali wawasan dan alat untuk mentransformasi ide-ide inovatif menjadi solusi lingkungan yang nyata dan terukur di era digital.'
                    image='https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png'
                    variant='left'
                    buttontext='DAFTAR IT WORKSHOP'
                    buttonprops={{
                        onClick: () => alert("Daftar"),
                        variant: "primary",
                        className: "shadow-lg"
                    }}
                />
            </div>

            <div className="bg-[#FEE3EC]">
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-top.png" alt="" className="w-full" />
                </div>

                {/* khusus */}
                <div className="space-y-10 p-10">
                    <Infocard
                        title='IT Competition'
                        description='"From Creation to Innovation" adalah sebuah kompetisi IT yang dirancang untuk menjembatani jurang antara ide kreatif dan inovasi nyata. Ajang ini menantang para talenta digital untuk tidak hanya menciptakan sesuatu yang baru, tetapi juga mengembangkannya menjadi solusi yang berdampak, berkelanjutan, dan bernilai guna tinggi.'
                        image='https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png'
                        variant='right'
                        buttontext='DAFTAR IT COMPETITION'
                        buttonprops={{
                            onClick: () => alert("Daftar"),
                            variant: "primary",
                            className: "shadow-lg"
                        }}
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