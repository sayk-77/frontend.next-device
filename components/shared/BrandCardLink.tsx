'use client';

import Link from "next/link";
import { Card } from "@/components/shared";
import useBrandStore from "@/store/storeBrand";

interface Props {
    id: number;
    name: string;
    imageUrl: string;
}

export default function BrandCardLink({ id, name, imageUrl }: Props) {
    const setBrandId = useBrandStore(state => state.setBrandId);
    const setBrandName = useBrandStore(state => state.setBrandName);

    const handleClick = () => {
        setBrandId(id);
        setBrandName(name);
    };

    return (
        <Link href={`/brands/${name}`} onClick={handleClick}>
            <Card imageUrl={imageUrl} name={name} />
        </Link>
    );
}