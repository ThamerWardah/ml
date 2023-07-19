'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import {AiOutlineWhatsApp ,AiOutlineDoubleLeft} from 'react-icons/ai'
import { useState ,useCallback } from "react"
import clsx from "clsx"
import Mon from "./Month"

const MonthItem = ({monthsData,user,adminName})=>{ 
    const router = useRouter();
    const monthData = monthsData
    const [isOpen , setIsOpen] = useState(false);
    const [sendData,setSendData]=useState({aPayed:'',aMoney:'',aDate:'',expireDate:'',totall:''})
   
    const totalDebt = monthData.map((item)=>(parseFloat(item.money)-parseFloat(item.payed)));
    let tot = 0
    const tot2 = totalDebt.map((item)=>tot+=parseFloat(item))
    const theTotall = tot2[totalDebt.length - 1]

    const toggleIsOpen = useCallback(()=>{
        if(isOpen){setIsOpen(false)}else{setIsOpen(true)}
    },[isOpen]);


    const handleRedirect = () => {
        window.open(`https://api.whatsapp.com/send?phone=+964${user.phone.slice(1,)}&text=


        
                                                                                                *_${adminName}_*
                                                                                        *تحية طيبة عزيزي المشترك*
                                                                                        تم تفعيل اشتراك الانترنت  
                                                                                        اسم المشترك :${user.name}
                                                                                        كلفة الاشتراك : *${sendData.aMoney}000* د.ع 
                                                                                        المبلغ الواصل : *${sendData.aPayed}000* د.ع 
                                                                                        المبلغ المتبقي : *${(parseFloat(sendData.aMoney)-parseFloat(sendData.aPayed))}000* د.ع 
                                                                                        مجموع الديون الكلي : *${sendData.totall}000* د.ع 
                                                                                        تاريخ انتهاء الاشتراك : ${sendData.expireDate}


                                                                                        *علماً ان هذه الرساله الكترونيه عن طريق الحاسبه*      
        
        
        `, '_blank');
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

                    {user.phone.length !==0 && <AiOutlineWhatsApp onClick={()=>{
                        toggleIsOpen()
                        setSendData({...sendData,aPayed:item.payed ,aMoney:item.money,aDate:JSON.stringify(item.createdAt).slice(1,11),
                            
                            expireDate:
                                [parseInt((JSON.stringify(item.createdAt).slice(1,11).split('-')[1]))  < 12 ?(JSON.stringify(item.createdAt).slice(1,11).split('-'))[0]: parseInt((JSON.stringify(item.createdAt).slice(1,11).split('-')[0]))+1 ,
                                
                                (parseInt((JSON.stringify(item.createdAt).slice(1,11).split('-')[1])) <12 ? parseInt((JSON.stringify(item.createdAt).slice(1,11)?.split('-')[1]))+1:1 ),
                                
                                (JSON.stringify(item.createdAt).slice(1,11).split('-'))[2]].join('-') ,totall:theTotall
                                })


                    }} className="text-green-400 font-bold text-2xl cursor-pointer" /> }
                    </div>
                ))}
             </div> }
            <Mon id={user.id}/> 

             { isOpen &&<div className={clsx(`flex justify-center items-center absolute top-0 left-0 w-full h-full bg-gradient-to-l from-red-600/50 to-green-300/60`)}>
                <div className="relative bg-black/80 text-white shadow-lg mx-26 rounded-lg p-20">
                    <div onClick={()=>toggleIsOpen()} className="absolute top-2 right-2">
                    <AiOutlineDoubleLeft className="text-green-300 cursor-pointer font-bold text-2xl animate-pulse" /> </div>
                    <div dir="rtl" className=" gap-y-4 "> 

                        <h1 className="font-bold text-2xl text-fuchsia-300">
                                                   {adminName}

                        </h1><h1>

                                                                                        تحية طيبة عزيزي المشترك
                        </h1><h1>

                                                                                        تم تفعيل اشتراك الانترنت  
                        </h1><h1>

                                                                                        اسم المشترك : {user.name}
                        </h1><h1>

                                                                                        كلفة الاشتراك : {sendData.aMoney}000 د.ع 
                        </h1><h1>

                                                                                        المبلغ الواصل : {sendData.aPayed}000 د.ع 
                        </h1><h1>

                                                                                        المبلغ المتبقي : {(parseFloat(sendData.aMoney)-parseFloat(sendData.aPayed))}000 د.ع 
                        </h1><h1>

                                                                                        مجموع الديون الكلي :  {sendData.totall}000 د.ع 
                        </h1><h1>
                                                                                        تاريخ انتهاء الاشتراك : {sendData.expireDate}


                        </h1><h1>
                                                                                        علماً ان هذه الرساله الكترونيه عن طريق الحاسبه  

                        </h1>

                    </div>
                 

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