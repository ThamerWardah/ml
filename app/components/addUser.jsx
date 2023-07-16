'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from 'react-hot-toast'
import clsx from 'clsx'
import Input from './Input'
import {useSession} from 'next-auth/react'


export default function NewUser({distributorId}){
    const session = useSession();
    const distributor = session.data?.user?.name || ""
   

    const initialData ={
        name:'',
        username:'',
        phone:'',
        distributorId:distributorId
    }

    const router = useRouter()
    const [data ,setData]=useState(initialData);
    const [isLoading , setIsLoading]=useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        axios.post('/api/newUser',data).then(()=>{
            toast.success('User has been added');
            setData(initialData)
            setTimeout(()=>{
                router.refresh()
            },500)
            
        }).finally(()=>setIsLoading(false))
    }

    return(
        <div className="h-full w-full bg-gray-100">
                        
           {!isLoading && <h1 onClick={()=>router.push('/dashboard')} className='absolute top-6  right-10 cursor-pointer px-4 py-1 rounded-lg font-bold bg-black text-white '>Exit</h1>}
            <div className="flex justify-center items-center h-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-3/4">

                   <Input type='text' placeholder='Name' disabled={isLoading} value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>


                   <Input type='text' placeholder='Username' disabled={isLoading} value={data.username} onChange={(e)=>setData({...data,username:e.target.value})}/>

                   <Input type='text' placeholder='Phone Number' disabled={isLoading} value={data.phone} onChange={(e)=>setData({...data,phone:e.target.value})}/>
                    <button disabled={isLoading} className={clsx(`border-2 rounded-tr-full mt-4 rounded-bl-full bg-gradient-to-tr from-blue-500 to-green-300 shadow-lg shadow-gray-400 border-none  text-gray-800 font-bold`,isLoading&&'opacity-50')}>Add User</button>
                </form>
            </div>
           {isLoading &&  <div className={clsx(isLoading && `absolute top-0 w-full h-full bg-gradient-to-r text-center pt-20 text-2xl font-bold from-green-300 to-rose-300 opacity-20 animate-pulse`)}>Adding The User</div> }
        </div>
    )
}