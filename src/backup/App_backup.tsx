import './App.css';
import Header from './components/Header';
import Collapse from "./components/Collapse";
import SpeakerCard from "./components/SpeakerCard";
import Infocard from './components/Infocard';
import Eventcard from './components/Eventcard';
import Competitioncard from './components/Competitioncard';
import Redirect from './components/ui/Redirect';
import { Camera, Home, Mic, Play, Trophy, User, Wrench } from 'lucide-react';



function App() {
    return (
        <>
            <Header />

            <div className="space-y-10 p-10">
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
            </div>

            <div className='px-57 pb-5 pt-5 font-semibold bg-[#e7cfd5]'>
                <h3 className='text-4xl text-red-900'>Tentang INVOFEST</h3>
                <p className='text-2xl text-gray-600'>Invofest 2025, yang diselenggarakan oleh sarjana terapan Teknik Informatika Universitas Harkat Negeri,
                    adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia
                    dalam menghadapi era digital.Invofest 2025 menghadirkan berbagai kegiatan menarik seperti kompetisi IT,
                    workshop IT, dan seminar nasional & talkshow dengan para ahli teknologi.</p>
            </div>

            <div className="bg-[#e7cfd5] px-55 pb-10">
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

            <h1 className='text-center text-5xl font-bold text-red-900 pt-10 '>DAFTAR KOMPETISI</h1>
            <h3 className='text-center text-2xl text-gray-600 pt-10'>Berikut adalah kompetisi yang ada saat diselenggarakan INVOFEST</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-55 py-10'>
                <Competitioncard
                    title='Poster Design Competition'
                    description='Poster Design Competition ini adalah kompetisi untuk menciptakan 
            suatu karya dalam bentuk poster digital yang komunikatif dan inspiratif, guna 
            menyuarakan gagasan terhadap permasalahan yang ada sekarang ini.'
                    image='https://www.invofest-harkatnegeri.com/assets/competition-card/software_dev.png'
                    buttonText='INFO SELENGKAPNYA'
                    buttonProps={{ variant: "primary" }}
                />

                <Competitioncard
                    title='UI/UX Design Competition'
                    description='UI/UX Design Competition ini adalah kompetisi untuk menciptakan 
          dan merancang inovasi sebuah produk digital yang dapat berupa website maupun 
          mobile apps serta dapat membuat nyaman calon pengguna.'
                    image='https://www.invofest-harkatnegeri.com/assets/competition-card/ui_ux.png'
                    buttonText='INFO SELENGKAPNYA'
                    buttonProps={{ variant: "primary" }}
                />

                <Competitioncard
                    title='Web Design Competition'
                    description='Web Design Competition ini adalah kompetisi untuk menciptakan 
          suatu perangkat lunak berbasis website yang menggunakan desain menarik, unik, 
          dan responsive pada semua device serta sesuai dengan tema kompetisi.'
                    image='https://www.invofest-harkatnegeri.com/assets/competition-card/web_design.png'
                    buttonText='INFO SELENGKAPNYA'
                    buttonProps={{ variant: "primary" }}
                />
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

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-55 py-10'>
                <SpeakerCard
                    imageUrl='https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png'
                    name='Dery Agung Triyadi'
                    role='AWS Indonesia'
                />

                <SpeakerCard
                    imageUrl='https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png'
                    name='Sowam Habibi'
                    role='Google Indonesia'
                />
            </div>

            {/* Khusus */}
            <div className="space-y-10 p-10 bg-[#e7cfd5]">
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

            {/* khusus */}
            <div className="space-y-10 p-10 bg-[#e7cfd5]">
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

            <h3 className='text-center text-xl font-semibold p-5'>FAQ</h3>
            <h1 className='text-center text-5xl font-semibold p-5'>Punya Pertanyaan? Lihat Disini</h1>
            <h4 className='text-center text-gray-600'>Ada banyak informasi yang terkait dengan INVOFEST, Anda dapat melihat daftar pertanyaan di bawah ini.</h4>

            <div className='grid grid-cols-6 md:grid-cols-2 lg:grid-cols-2 gap-6 px-55 py-10'>
                <Collapse title="Apa Itu Invofest?" description="Invofest (Informatics Vocational Festival) adalah festival tahunan yang diakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri, yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital." />
                <Collapse title="Kapan Dan Dimana INFOVEST Dilaksanakan?" description="INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025. Untuk acara workshop, seminar, talkshow diadakan secara Offline di kampus 1 Universitas Harkat Negeri dan kompetisi diadakan secara Online." />
                <Collapse title="Apakah Ada Biaya Pendaftaran di INVOFEST?" description="Semua kegiatan dipastikan berbayar ya teman-teman." />
                <Collapse title="Bagaimana Saya Tahu Pemenang Kompetisi?" description="Pemenang akan diinformasikan melalui media sosial instagram dari invofest @invofest_harkatnegeri." />
                <Collapse title="Apa Yang Didapat Pemenang Dalam Kompetisi?" description="Pemenang kompetisi akan mendapatkan hadiah trophy, uang pembinaan, dan e-sertifikat." />
                <Collapse title="Bagaimana Cara Mendaftar Event?" description="Buka https://www.invofest-harkatnegeri.com lalu pergi ke halaman event yang anda ingin ikuti atau scroll kebagian bawah halaman beranda dengan klik mendaftar pada salah satu eventnya, jika sudah maka diarahkan ke halaman detail event dan klik tombol 'Registrasi' maka akan diarahkan ke google form pengisian pendaftaran event yang diikuti.." />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-55 py-10 bg-[#e7cfd5]'>
                {/* col 1 */}
                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" />
                </div>

                {/* col 2 */}
                <div className='p-5'>
                    <h3 className='pb-5 font-semibold'>MENU NAVIGASI</h3>
                    <div className='text-gray-600 space-y-4'>
                        <Redirect
                            title='Beranda'
                            icon={<Home size={18} />}
                        />
                        <Redirect
                            title='Seminar'
                            icon={<User size={18} />}
                        />
                        <Redirect
                            title='Competition'
                            icon={<Trophy size={18} />}
                        />
                        <Redirect
                            title='Workshop'
                            icon={<Wrench size={18} />}
                        />
                        <Redirect
                            title='Talkshow'
                            icon={<Mic size={18} />}
                        />
                    </div>
                </div>

                {/* col 3 */}
                <div className='p-5'>
                    <h3 className='pb-5 font-semibold'>IKUTI KAMI</h3>
                    <div className='text-gray-600 space-y-4'>
                        <Redirect
                            title='Instagram'
                            icon={<Camera size={18} />}
                        />
                        <Redirect
                            title='Youtube'
                            icon={<Play size={18} />}
                        />
                    </div>
                </div>

                {/* col 4 */}
                <div className='p-5 space-y-4'>
                    <h3 className='font-semibold'>ALAMAT</h3>
                    <img src="https://i.pinimg.com/1200x/bf/ac/3c/bfac3c919a5d09d57975efa6765116b1.jpg" className='max-w-60 max-h-40' />
                </div>
            </div>
        </>
    );
}

export default App;