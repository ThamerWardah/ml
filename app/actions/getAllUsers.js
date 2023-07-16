import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from '../Libs/prismad';

async function getSession(){
    return await getServerSession(authOptions);
}

export default async function currentDistributorUsers(){

    
    const session = await getSession();
    if (!session?.user?.email){return null}

    const theCurrentUser = await prisma.distributor.findUnique({
        where:{
            email:session?.user?.email 
        },
        include:{users:true}
    });

    if(!theCurrentUser){return []}

    return theCurrentUser
}


