import prisma from '../../../Libs/prismad';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider  from 'next-auth/providers/credentials';
import NextAuth  from 'next-auth/next';
import bcrypt from 'bcrypt';
import { sign } from 'crypto';
import { signIn } from 'next-auth/react';


export const authOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label:'Name',type:'email',placeholder:'Email'},
                password:{label:'Password',type:'password',placeholder:"Password"},
            },
            async authorize(credentials){

                if(!credentials.email || !credentials.password){
                    throw new Error('credentials are required')}

                    const user = await prisma.distributor.findUnique({
                        where:{
                            email:credentials.email
                        }
                    })
                    if(!user){throw new Error('No such user found')}
                   
                    const correctPassword = await bcrypt.compare(credentials.password,user.hashedPassword);
                    if(!correctPassword){throw new Error('Inccorect password')}

                    return user
                    }
        }),
    ],
   
    session:{
        strategy:'jwt'
    },
    debug:process.env.NODE_ENV === 'development',
    secret:process.env.NEXTAUTH_SECRET
    
};

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}