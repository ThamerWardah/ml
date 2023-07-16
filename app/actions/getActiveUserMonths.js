import prisma from '../Libs/prismad';


export default async function UserMonth(id){
    const userMonth = await prisma.user.findUnique({
        where:{id},
        include:{months:true} ,
    });
    if(!userMonth){return []}

    return userMonth; 
}


