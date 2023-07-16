'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from 'react-hot-toast'
import Input from './Input'
import clsx from 'clsx'


const Mon = ({id})=>{

    const userId = id
    const initialData ={
        month:'',
        money:'',
        note:'',
        userId:userId,
    }

    const router = useRouter()
    const [data ,setData]=useState(initialData);
    const [isLoading , setIsLoading]=useState(false);


    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        axios.post('/api/newMonth',data).then((callback)=>{
           if(!callback?.error){
            toast.success('Done');
            setData(initialData);
            setTimeout(()=>{
                router.refresh()
            },500)
           };
           if(callback?.error){toast.error(callback.error)}
            
        }).finally(()=>setIsLoading(false))
    }
    return(
        <div className="flex justify-center mt-10 ">
       
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-3/4 mb-20">

                   <Input type='text' placeholder='Month' disabled={isLoading} value={data.month} onChange={(e)=>setData({...data,month:e.target.value})}/>

                   <Input type='text' placeholder='0.0$' disabled={isLoading} value={data.money} onChange={(e)=>setData({...data,money:e.target.value})}/>

                   <Input type='text' placeholder='Notes' disabled={isLoading} value={data.note} onChange={(e)=>setData({...data,note:e.target.value})}/>

                    <button className={clsx(`border-2 rounded-tr-full mt-4 rounded-bl-full bg-gradient-to-tr from-blue-500 to-green-300 shadow-lg shadow-gray-400 border-none  text-gray-800 font-bold`,isLoading&&'opacity-50 ')}>Add</button>
                </form>
        </div>
    )
}

export default Mon;