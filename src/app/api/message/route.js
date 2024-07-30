import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const pageSize = parseInt(searchParams.get('pageSize')) || 5;

        const messages = await prisma.message.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const totalMessages = await prisma.message.count();

        return new Response(JSON.stringify({
            success: true,
            data: messages,
            total: totalMessages,
            page,
            pageSize,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Internal Server Error',
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
