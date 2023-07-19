
import prisma from '../../Libs/prismad'
import { NextResponse } from 'next/server';

export async function POST(request){

    const body = await request.json();
    const {month , money ,payed,note, userId} = body;
    

    const aMonth = await prisma.month.create({
        data:{
            month,
            money,
            payed,
            note,
            userId
        }
    });

    return NextResponse.json(aMonth)
}