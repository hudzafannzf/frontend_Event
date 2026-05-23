interface ListItemProps {
    title: string;
}

const ListItem: React.FC<ListItemProps> = ({
    title
}) => {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <div className="h-5 w-5 bg-gray-500 rounded-md"></div>
                {/* kanan */}
                <div className="flex justify-between items-center w-120">
                    <p className="text-gray-700 text-xl">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default ListItem;