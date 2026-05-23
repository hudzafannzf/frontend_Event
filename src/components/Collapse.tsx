import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CollapseProps{
    title: string;
    description: string;
}

const Collapse: React.FC<CollapseProps> = ({title, description}) =>{
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="border-2 border-pink-200 rounded-xl shadow-md overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer w-full px-4 py-3 flex items-center gap-4 bg-white hover:bg-gray-50 transition-colors">

                <div className="p-2 bg-gray-100">
                <ChevronDown size={20} className={`text-gray-600 rounded-lg transition-transform ${isOpen ? "rotate-180" : "" }`}/>
                </div>

                <span className="text-lg font-semibold text-gray-800">{title}</span>
            </button>

            {isOpen && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{description}</p>
                </div>
            )}
        </div>
    );
};

export default Collapse;