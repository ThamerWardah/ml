import Image from "next/image";
const HomePage = () => {
 
    return(
        <div className=" h-full">
        
           <Image 
            src='/rayah.jpg'
            alt="Muharam"
            height={840}
            width={640}
            className='h-auto'
           />
        
        </div>
    )
};

export default HomePage ;