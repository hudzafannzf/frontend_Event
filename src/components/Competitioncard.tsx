import Button from "./ui/Button";
import type { ButtonProps } from "./ui/Button";

interface CompetitioncardProps {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    buttonProps?: Omit<ButtonProps, "label">;
};

const Competitioncard: React.FC<CompetitioncardProps> = ({ title, description, image, buttonText, buttonProps }) => {
    return (
        <div className="border-4 border-gray-200 rounded-lg">
            <div>
                <img src={image} className="w-full max-h-130 max-w-130" />
            </div>
            <div className="p-5 gap-5">
                <h3 className="text-gray-900 font-bold text-xl">{title}</h3>
                <p className="text-gray-800 pt-5">{description}</p>
                <div className="pt-5">
                    <Button label={buttonText} {...buttonProps} />
                </div>
            </div>

        </div>
    );
};

export default Competitioncard;