import { CalendarDays, Clock3, MapPin } from "lucide-react";

type WorkshopCardProps = {
    icon: React.ReactNode;
    title: string;
    date: string;
    time: string;
    location: string;
};

const WorkshopCard: React.FC<WorkshopCardProps> = ({
    icon,
    title,
    date,
    time,
    location,
}) => {
    return (
        <div className="flex items-center gap-6 bg-gray-100 p-10 rounded-2xl shadow-[6px_0px_0_#7a2d3b] w-full max-w-xl">

            {/* Icon */}
            <div className="bg-[#7a2d3b] text-white p-10 rounded-3xl">
                {icon}
            </div>

            {/* Content */}
            <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                    {title}
                </h2>

                <div className="space-y-2 text-slate-500">

                    <div className="flex items-center gap-3">
                        <CalendarDays size={18} />
                        <span>{date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock3 size={18} />
                        <span>{time}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin size={18} />
                        <span>{location}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WorkshopCard;