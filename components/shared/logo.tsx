import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const Logo = () => {
    const isMobile = useMediaQuery({ maxWidth: 500 });

    return (
        <Link href="/" className="flex items-center gap-2 ml-[5px] pl-2">
            <Image
                src={"/logo.png"}
                alt="logo"
                width={isMobile ? 80 : 120}
                height={isMobile ? 40 : 40}
                className="object-contain"
            />
        </Link>
    );
};

export default Logo;