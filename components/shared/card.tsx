
interface CardProps {
    name: string,
    imageUrl: string
}

export const Card:React.FC<CardProps> = ({name, imageUrl}) => {
    return (
        <div className="flex flex-col items-center hover:-translate-y-1 transition">
            <img
                src={`${imageUrl}`}
                alt={name}
                className="object-scale-down rounded-[20px] h-32 w-32 mt-[5px]"
            />
            <p className="pt-[5px] text-[20px]">{name}</p>
        </div>
    )
}