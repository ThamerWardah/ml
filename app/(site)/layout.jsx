import Link from "next/link";

export default function HomeLayout({children}){
    return(
        <div
         className="h-full bg-gray-100 "
        >

            <nav className="flex justify-between px-6 py-2 bg-black text-white ">
                <h1 className="text-gray-500/50 animate-pulse duration-200">Murtdha</h1>
                <div className="px-2 rounded-lg bg-black text-sm py-1 shadow-md shadow-green-200/60 text-white border-[1px] active:border-green-500 border-yellow-100 active:shadow-green-500 hover:border-purple-500 hover:shadow-purple-400"><Link href='/addUser'>Add User</Link></div>
            </nav>
            {children}
            
            
            </div>
    )
}