'use client'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect} from 'react'
import { useRouter } from "next/navigation";
const SignOut = ()=>{
    const session = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(session?.status === 'unauthenticated'){
            router.push('/')
        }
    },[session?.status,router])
    
    return(
        <button type="button" onClick={()=>signOut()} >Sign out</button>
    )
}
export default SignOut ;