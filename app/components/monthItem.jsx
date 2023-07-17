'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import {AiOutlineWhatsApp ,AiOutlineDoubleLeft} from 'react-icons/ai'
import { useState ,useCallback } from "react"
import clsx from "clsx"
import Mon from "./Month"

const MonthItem = ({monthsData , id ,phone})=>{ 
    const router = useRouter();
    const monthData = monthsData
    const [isOpen , setIsOpen] = useState(false);
    const [sendData,setSendData]=useState({aMonth:'',aMoney:'',aDate:''})

    const toggleIsOpen = useCallback(()=>{
        if(isOpen){setIsOpen(false)}else{setIsOpen(true)}
    },[isOpen]);

    const handleRedirect = () => {
        window.open(`https://api.whatsapp.com/send?phone=+964${phone.slice(1,)}&text=تاريخ الاشتراك ---${sendData.aDate}          سعر الاشتراك---${sendData.aMoney} `, '_blank');
      };

    const handleDelete = async(id)=>{  
    const data = { id }
        axios.post('/api/deleted',data).then((callback)=>{
            if(!callback?.error ){
                toast.success('Deleted');
                router.refresh();
            };
            if(callback?.error){toast.error('Somthing wrong happend')}
        })
    }

    return(
        <div>
            {!isOpen && 
               <div className='flex flex-col gap-y-4 mt-20'>
                {monthData.map((item)=>(<div key={item.id} className="bg-gray-200  px-4 border-2 border-blue-400 rounded-sm mx-8 font-semibold flex flex-col gap-y-8 text-center">
                    <div  className='flex justify-between '>
                        <div className='flex gap-x-6'>
                            <h1>{item.month}</h1>
                            <h1 className='text-green-500'>{item.money}</h1>
                            <h3 className="text-sm  pt-[2px] ">{JSON.stringify(item.createdAt).slice(1,11)}</h3>
                        </div>
                        <button type="button" onClick={()=>handleDelete(item.id)} className='text-red-500 text-sm'>Delete</button>
                    </div>
                    <div>{item.note}</div>

                    {phone.length !==0 && <AiOutlineWhatsApp onClick={()=>{
                        toggleIsOpen()
                        setSendData({...sendData,aMonth:item.month,aMoney:item.money,aDate:JSON.stringify(item.createdAt).slice(1,11)})
                    }} className="text-green-400 font-bold text-2xl cursor-pointer" /> }
                    </div>
                ))}
             </div> }
            <Mon id={id}/> 

             { isOpen &&<div className={clsx(`flex justify-center items-center absolute top-0 left-0 w-full h-full bg-gradient-to-l from-red-600/50 to-green-300/60`)}>
                <div className="relative bg-black/80 text-white shadow-lg mx-26 rounded-lg p-20">
                    <div onClick={()=>toggleIsOpen()} className="absolute top-2 right-2">
                    <AiOutlineDoubleLeft className="text-green-300 cursor-pointer font-bold text-2xl animate-pulse" /> </div>
                    <h1 dir="rtl"> تاريخ الاشتراك ---{sendData.aMonth}</h1>
                    <h1 dir="rtl">  سعر الاشتراك---{sendData.aMoney}</h1>
                    <h1 dir="rtl">  تاريخ الاشتراك ---{sendData.aDate}</h1>
                     <div className="absolute bottom-2 right-2">
                     <AiOutlineWhatsApp onClick={()=>{
                        toggleIsOpen();
                        handleRedirect();
                        }} className="text-green-400 font-bold text-2xl cursor-pointer animate-pulse" />
                     </div>
                </div>
            </div> } 
            
        </div>
    )
}

export default MonthItem;