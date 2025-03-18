import Image from "next/image"

interface CardProps {
    name: string,
    imageUrl: string
}

export const Card:React.FC<CardProps> = ({name, imageUrl}) => {
    return (
        <div className="flex flex-col items-center hover:-translate-y-1 transition bg-white border rounded-lg shadow-md p-4 w-32 sm:w-40 md:w-48 lg:w-56">
            <Image
                src={imageUrl}
                alt={name}
                width={200}
                height={200}
                className="object-scale-down rounded-[20px] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
            />
            <p className="pt-2 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-medium text-center">{name}</p>
        </div>
    )
}