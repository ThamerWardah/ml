import { PrismaClient } from "@prisma/client";

const cleint = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prisma = cleint

export default cleint;