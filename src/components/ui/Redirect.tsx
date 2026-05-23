interface RedirectProps {
    title: string;
    icon?: React.ReactNode;
}

const Redirect: React.FC<RedirectProps> = ({ title, icon }) => {
    return (
        <div className="flex items-center gap-3 cursor-pointer">
            <span>{icon}</span>
            <p>{title}</p>
        </div>
    );
};

export default Redirect;