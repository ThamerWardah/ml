'use client'
import {useSession} from 'next-auth/react'
import { useRouter } from "next/navigation"
import clsx from 'clsx'
import { useState } from 'react'
const Nav = ()=> {
    const ss = useSession();
    const router = useRouter();
    const where = ss?.status==='authenticated'?'Users Page':'Sign In';
    const toWhere =ss?.status==='authenticated'?'dashboard':'signRegister';
    const [shown,setShown] = useState(false)
    setTimeout(()=>setShown(true),2000)
    return(
        <div className="flex justify-end px-8 py-4 cursor-pointer">
            <h1 className={clsx(`border-t-2  rounded-full px-4 border-t-green-300 shadow-lg shadow-white/30 hover:border-t-blue-600 active:border-t-red-400`,shown&&`opacity-100`,!shown&&`opacity-0`)} onClick={()=>router.push(`/${toWhere}`)}>{where}</h1>
        </div>
    )
}

export default Nav;