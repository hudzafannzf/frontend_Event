import Collapse from "./Collapse";

const FrequentlyAskedQuestion = () => {
    return (
        <div>
            <h3 className='text-center text-gray-600 text-xl font-semibold p-5'>FAQ</h3>
            <h1 className='text-center text-5xl font-semibold p-5'>Punya Pertanyaan? Lihat Disini</h1>
            <h4 className='text-center text-gray-600'>Ada banyak informasi yang terkait dengan INVOFEST, Anda dapat melihat daftar pertanyaan di bawah ini.</h4>

            <div className='flex flex-col md:flex-row gap-6 px-54 py-10'>
                {/* Kolom kiri */}
                <div className="flex-1 space-y-6">
                    <Collapse title="Apa Itu Invofest?" description="Invofest (Informatics Vocational Festival) adalah festival tahunan yang diakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri, yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital." />
                    <Collapse title="Kapan Dan Dimana INFOVEST Dilaksanakan?" description="INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025. Untuk acara workshop, seminar, talkshow diadakan secara Offline di kampus 1 Universitas Harkat Negeri dan kompetisi diadakan secara Online." />
                    <Collapse title="Apakah Ada Biaya Pendaftaran di INVOFEST?" description="Semua kegiatan dipastikan berbayar ya teman-teman." />
                </div>

                {/* Kolom kanan */}
                <div className="flex-1 space-y-6">
                    <Collapse title="Bagaimana Saya Tahu Pemenang Kompetisi?" description="Pemenang akan diinformasikan melalui media sosial instagram dari invofest @invofest_harkatnegeri." />
                    <Collapse title="Apa Yang Didapat Pemenang Dalam Kompetisi?" description="Pemenang kompetisi akan mendapatkan hadiah trophy, uang pembinaan, dan e-sertifikat." />
                    <Collapse title="Bagaimana Cara Mendaftar Event?" description="Buka https://www.invofest-harkatnegeri.com lalu pergi ke halaman event yang anda ingin ikuti atau scroll kebagian bawah halaman beranda dengan klik mendaftar pada salah satu eventnya, jika sudah maka diarahkan ke halaman detail event dan klik tombol 'Registrasi' maka akan diarahkan ke google form pengisian pendaftaran event yang diikuti.." />
                </div>
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestion;