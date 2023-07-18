import Image from "next/image";
const HomePage = () => {
 
    return(
        <div className="mt-10">
        <div className=''>
           <Image 
            src='/rayah.jpg'
            alt="Muharam"
            height={840}
            width={640}
            className='h-auto'
           />
        </div>
        </div>
    )
};

export default HomePage ;