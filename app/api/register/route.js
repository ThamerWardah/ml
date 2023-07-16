import prisma from '../../Libs/prismad';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'


export async function POST(request){

    const body = await request.json();
    const {name ,email , password } = body ;

    if(!name || !email || !password){throw new Error("Missing some data")};

    const hashedPassword = await bcrypt.hash(password,12);
    const existed = await prisma.distributor.findUnique({
        where:{
            email,
        }
    })

    if(existed){throw new Error("User is already existed")}
    const distributor = await prisma.distributor.create({
        data:{
            name ,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(distributor)

}