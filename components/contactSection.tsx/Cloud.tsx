
import Image from 'next/image';
import React from 'react';


const Cloud = ({ src, alt = 'cloudImg' }: { src: string, alt?: string }) => {

    return (
        <div className='lg:w-[30vw] md:w-[40vw] w-[60vw] sm:w-[50vw] aspect-video'>
            <Image src={src} alt={alt} fill className='object-contain' sizes='50vw' />
        </div>
    );
};

export default Cloud;