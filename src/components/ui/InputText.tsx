interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    tipe: string;
    name: string;
    error?: string;
    
}

const InputText: React.FC<InputTextProps> = ({tipe, name, error,  ...props}) => {
    return (
        <input 
        type={tipe}
        name={name}
        {...props} 
        className={`border p-2 rounded-md focus:border-red-400 outline-none ${error ? "bg-red-100" : "bg-white"}`}
        />
    );
};

export default InputText;