import Button from "./ui/Button";
import type { ButtonProps } from "./ui/Button";

interface InfocardProps{
    title: string;
    description: string;
    image: string;
    variant?: "left" | "right";
    buttontext: string;
    buttonprops?: Omit<ButtonProps, "label">;
    
};

export const Infocard: React.FC<InfocardProps> = ({title, description, image, variant = "left", buttontext, buttonprops}: InfocardProps) =>{
    return (
        <div className={`rounded-2xl p-10 flex flex-col md:flex-row items-center justify-evenly gap-10 ${variant === "right" ? "md:flex-row-reverse" : ""}`}>
            {/* // bagian teks */}
            <div className="max-w-xl">
                <h1 className="text-6xl font-semibold text-red-900 mb-4">{title}</h1>
                <p className="text-gray-600 leading-relaxed text-xl">{description}</p>
                <div className="mt-6">
                    <Button label={buttontext} {...buttonprops} />
                </div>
            </div>
            {/* // bagian gambar */}
            <div className="w-80">
            <img src={image} alt={title} className="w-full object-contain"/>
            </div>
        </div>
    )
}

export default Infocard;