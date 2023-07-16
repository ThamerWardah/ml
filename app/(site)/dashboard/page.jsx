import Link from "next/link"
import currentDistributorUsers from "../../actions/getAllUsers"
export default async function dashboard(){
    const UsersT = await currentDistributorUsers() ;
    const Users = UsersT?.users || []
    return(
        <div className="p-10 text-blue font-bold">
            <div>_________________________________________</div>
          <div className="flex flex-col gap-4"> {Users.map((user)=>(
            <div key={user.id}>
            <h1 className="font-bold"><Link href={`/${user.id}`}>{user.name}</Link></h1>
            <h2 className="text-xs text-gray-400">{user.username}</h2>
            </div>
          ))}
           </div>
           
           <div>_________________________________________</div>
        </div>
    )
}