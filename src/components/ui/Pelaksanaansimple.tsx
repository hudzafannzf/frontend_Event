export interface PelaksanaansimpleProps {
    icon: React.ReactNode;
    text: string;
};

export const Pelaksanaansimple: React.FC<PelaksanaansimpleProps> = ({ icon, text }) => {
    return (
            <div className="flex items-center gap-4 bg-gray-100 p-5 rounded-xl shadow-[5px_5px_0_#7a2d3b]">
                <div className="bg-[#7a2d3b] text-white p-4 rounded-lg text-xl">
                    {icon}
                </div>
                <p className="text-gray-700">{text}</p>
            </div>
    );
}

export default Pelaksanaansimple;