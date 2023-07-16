import { NextResponse } from 'next/server';
import prisma from '../../Libs/prismad';

export  async function POST(request){
     
    const body = await request.json();
    const {name , username ,phone, distributorId }  = body
    
    if(!name || !username){throw new Error('The name and username are required')}
  
    const user = await prisma.user.create({
        data:{
            name,
            username,
            phone,
            distributorId
        }
    })

    return NextResponse.json(user)

}