import Link from "next/link";
import AddDistributor from './components/AddDistributor';
export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 mpt-8">


    <Link href='/dashboard'  className="text-green-400 border-2 border-balck rounded-full px-4 py-2 hover:bg-slate-100">Your Profile</Link>
  
    <Link href='/' className="text-red-400 border-2 border-balck rounded-full px-4 py-2 hover:bg-slate-100 ">Other Users</Link>

    <AddDistributor />
    
    </div>
    
  )
}
