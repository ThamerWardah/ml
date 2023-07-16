'use client'
import { useState , useCallback  } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from 'react-hot-toast'
import clsx from 'clsx'
import {signIn} from 'next-auth/react'

import Input from './Input'


const AddDistributor = ()=>{

    
    const initialData ={
        name:'',
        email:'',
        password:''
    }

    const router = useRouter()
    const [data ,setData] = useState(initialData);
    const [variant , setVariant] = useState('signin');
    const [isLoading , setIsLoading] = useState(false);

    const toggleVariant = useCallback(()=>{
        variant === 'signin'?setVariant('login'):setVariant('signin')
    },[variant])


    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        if(variant === 'signin'){
        axios.post('/api/register',data).then((callback)=>{
                 if(!callback?.error){
                      toast.success('Done');
                      setData(initialData);
                      setTimeout(()=>{
                             router.refresh()
                        },500)
                           };
                 if(callback?.error){toast.error(callback.error)}
                                                    
        }).finally(()=>setIsLoading(false)) }

        if(variant === 'login' ){
            signIn('credentials',{...data,redirect:false}).then((callback)=>{
                if(!callback?.error){toast.success("Loged in")};
                if(callback?.error){toast.error(callback.error)}
            }).finally(setIsLoading(false))
        }
    }

    return(
        <div>
        <div className="flex justify-center mt-10 ">
       
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-3/4 mb-20">

                 {variant === 'signin' &&  <Input type='text' placeholder='Name' disabled={isLoading} value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/> }

                   <Input type='email' placeholder='Email' disabled={isLoading} value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>

                   <Input type='password' placeholder='Password' disabled={isLoading} value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>

                    <button className={clsx(`border-2 rounded-tr-full mt-4 rounded-bl-full bg-gradient-to-tr from-blue-500 to-green-300 shadow-lg shadow-gray-400 border-none  text-gray-800 font-bold`,isLoading&&'opacity-50 ')}>{variant ==='signin' ?"Register":"Sign in"}</button>
                </form>
        </div>
        <div className="text-centerflex gap-2  ">{variant === 'signin'?"Sign in" : "Register"}<button className="underline text-gray-500 " type="button" onClick={()=>toggleVariant()}>{variant === 'signin'?"Sign in" : "Register"}</button></div>
        </div>
    )
}

export default AddDistributor;