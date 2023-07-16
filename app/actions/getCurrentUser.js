import prisma from '../Libs/prismad';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function getSession(){
    return await getServerSession(authOptions);
}

export default async function currentUser(){

    const session = await getSession();
    if (!session?.user?.email){return null}

    const theCurrentUser = await prisma.distributor.findUnique({
        where:{
            email:session?.user?.email 
        }
    });

    return{
        ...theCurrentUser,
        createdAt:theCurrentUser.createdAt.toISOString(),
        updatedAt:theCurrentUser.updatedAt.toISOString(),
    }
}


