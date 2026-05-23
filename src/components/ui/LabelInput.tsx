interface LabelInputProps{
    text: string;
    title: string;
}

const LabelInput: React.FC<LabelInputProps> = ({text, title}) =>{
    return <label htmlFor={title} className="text-semibold test-sm">{text}</label>;
};

export default LabelInput;