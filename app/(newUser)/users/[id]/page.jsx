import Link from 'next/link';
import currentDistributorUsers from '../../../actions/getAllUsers';
import MonthItem from '../../../components/monthItem';
import UserMonth from '../../../actions/getActiveUserMonths';


const singleUser = async ({params})=>{
   const theUserMonth = await UserMonth(params.id)
   const months = theUserMonth.months || [];

    const UsersT = await currentDistributorUsers() ;
    const Users = UsersT?.users || []
    const user =Users?.filter((item)=>item.id === params.id)

    return(
        <div className='lg:flex w-full h-full relative'> 
        <div className='sm:w-screen md:w-screen lg:mx-auto lg:w-3/4'>
            <div className='w-full flex flex-col'>
                <div className='flex justify-between items-center px-2'>
                        <h1 className='text-1xl font-bold px-6 pt-10 border-b-8  border-b-green-200 rounded-bl-full border-t-8 border-t-red-300 rounded-tr-full'>{user[0]?.name}</h1>
                        <h1 className='font-bold px-4 mt-8  border-2 bg-gray-200 rounded-tl-full shadow-md shadow-violet-600 '><Link href='/dashboard'>Home</Link></h1>
                </div>
                <div className='flex justify-start gap-x-10 px-10 mt-10 font-bold'>
                    <h1 className='text-gray-400'>{user[0]?.username}</h1>
                    <h1 className='text-gray-400'>{user[0]?.phone}</h1>

               </div>
            </div>
                    
                     <MonthItem monthsData={months} user={user[0]}/>   
             </div>
     </div>
    )
}

export default singleUser;