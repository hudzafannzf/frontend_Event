export interface ButtonProps{
    label: string;
    variant?: "primary" | "outline";
    className?: string;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({label, variant = "primary", className}) =>{
    const baseStyle = "px-10 py-3 rounded font-medium transition-all duration-200";
    const variantStyle = 
        variant === "primary"
            ? "bg-[#2B0505] text-[#F5EAEA] hover:bg-[#4A0F0F]"
            : "border border-[#2B0505] text-[#2B0505] hover:bg-[#2B0505]/10";
        return (
            <button className={`${baseStyle} ${variantStyle} ${className}`}>
                {label}
            </button>
        );
};

export default Button;