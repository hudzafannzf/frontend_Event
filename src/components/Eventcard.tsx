import Button from "./ui/Button";
import type { ButtonProps } from "./ui/Button";

interface EventcardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonProps?: Omit<ButtonProps, "label">;
};

const Eventcard: React.FC<EventcardProps> = ({
    title,
    description,
    buttonText,
    buttonProps
}) => {
    return (
        <div className="bg-[#f5f5f5] rounded-2xl p-6 relative overflow-hidden min-h-80 max-h-150">
            <div className="absolute right-0 top-0 h-full w-2 bg-red-900 rounded-tr-2xl rounded-br-2xl" />

            <div className="flex flex-col justify-between h-full">
                <div>
                    <h2 className="text-xl font-semibold text-red-900 mb-3">{title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
                <div className="mt-6">
                    <Button label={buttonText} {...buttonProps} />
                </div>
            </div>
        </div>
    );
};

export default Eventcard;