import { Home, User, Trophy, Wrench, Mic, Camera, Play } from "lucide-react";
import Redirect from "./Redirect";

const FooterInfo = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-55 py-10 bg-[#FEE3EC]'>
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

            <div className="flex justify-between px-54 py-10 bg-[#FEE3EC] text-gray-600">
                <p>© 2025 INVOFEST. All Right Reserved </p>
                <div className="flex flex-row gap-5">
                    <Play />
                    <Camera />
                </div>
            </div>
        </div>
    );
};

export default FooterInfo;