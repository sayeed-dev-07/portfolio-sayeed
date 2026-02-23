import Image from 'next/image';
import React from 'react';

const Sticker = ({link}:{link: string}) => {
    return (
        <div className=' relative w-[100px] md:w-[140px] aspect-square'>
            <Image alt='contactMe-sticker' src={link} sizes='20vw' fill className='object-contain'/>
        </div>
    );
};

export default Sticker;