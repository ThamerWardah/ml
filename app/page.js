import Link from "next/link";
export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 mpt-8">
      <h1 className="text-2xl font-bold text-blue-600 "> Welcome to my application</h1>
      <p className=" text-sm  text-slate-500 px-8 mb-10"> You can now use this web application to post your blogs and thing you like to share with others and read others blogs as well for the main version you can not comment on the other users blogs because we are in the beta verison of this web application we are working on that so do not wory you will get this feature soon.</p>
   
    <Link href='/'  className="text-green-400 border-2 border-balck rounded-full px-4 py-2 hover:bg-slate-100">Your Profile</Link>
  
    <Link href='/' className="text-red-400 border-2 border-balck rounded-full px-4 py-2 hover:bg-slate-100 ">Other Users</Link>
   
    </div>
    
  )
}
