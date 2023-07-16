import prisma from '../../Libs/prismad'
import { NextResponse } from 'next/server';

export async function POST(request){
    const body = await request.json();
    const {id } = body;
    const deletedMonth = await prisma.month.delete({
        where:{
            id:id
        }
    });

    return NextResponse.json(deletedMonth)
}