import React from 'react';

const ProjectCard = ({class: className}:{class : string}) => {
    return (
        <div className='h-full  w-full flex items-center justify-center'>
            <div className={`h-[80%] w-[80%] shrink-0 ${className}`}>

            </div>
        </div>  
    );
};

export default ProjectCard;