import LabelInput from "./ui/LabelInput";

interface FormInputProps {
    label: string;
    tipe: string;
    name: string;
    register?: any;
    error?: string;
    placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, tipe, name, register, error, placeholder }) => {
    return (
        <div className="flex flex-col gap-2 mb-3">
            <LabelInput text={label} title={name} />
            <input type={tipe}
                id={name}
                {...register(name)}
                placeholder={placeholder}
                className={`border p-2 rounded-md focus:border-[#4A0F0F] outline-none ${error ? "bg-[#F5EAEA]/70" : "bg-white"}`}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default FormInput;