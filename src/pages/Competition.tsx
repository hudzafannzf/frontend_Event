import Competitioncard from "../components/Competitioncard";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";
import Infocard from "../components/Infocard";

export default function Competition() {
    return (
        <div>
            {/* khusus */}
            <div className="space-y-10 p-10">
                <Infocard
                    title='IT Competition'
                    description='"From Creation to Innovation" adalah sebuah kompetisi IT yang dirancang untuk menjembatani jurang antara ide kreatif dan inovasi nyata. Ajang ini menantang para talenta digital untuk tidak hanya menciptakan sesuatu yang baru, tetapi juga mengembangkannya menjadi solusi yang berdampak, berkelanjutan, dan bernilai guna tinggi.'
                    image='https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png'
                    variant='left'
                    buttontext='INFO SELENGKAPNYA'
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

                <div className="p-54">
                    <h2 className="text-center text-6xl font-semibold text-red-900 mb-4">DESKRIPSI KOMPETISI</h2>
                    <p className="text-gray-600 leading-relaxed text-xl">Kompetisi atau perlombaan yang ada dalam kegiatan INVOFEST (Infomatics Vocational Festival) 2025 adalah diantaranya National Poster Design Competition, UI UX Design Competition, dan juga UI/UX Design Competition. Kompetisi dalam INVOFEST ini mengusung tema “From Creation to Innovation”Tema ini bertujuan mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang berkelanjutan. Melalui pendekatan ini, diharapkan generasi ini akan berperan dalam menciptakan solusi-solusi baru untuk tantangan masa kini dan mendatang, baik dalam hal teknologi, lingkungan, pendidikan, maupun tanggung jawab sosial.</p>
                </div>

                <div>
                    <img src="https://www.invofest-harkatnegeri.com/assets/wave-bot.png" alt="" className="w-full" />
                </div>

            </div>

            <h1 className='text-center text-5xl font-semibold text-red-900 pt-10 '>DAFTAR KOMPETISI</h1>
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

            <FrequentlyAskedQuestion />

        </div>
    );
}