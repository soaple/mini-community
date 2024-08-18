import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/database/db';
import { userPostCommentTable } from '@/database/schema';
import authOptions from '@/lib/authOptions';

interface RequestPayload {
    params: { postId: string };
}

export async function POST(req: NextRequest, payload: RequestPayload) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return Response.json('An error occurred.', {
            status: 400,
        });
    }

    const postId = payload.params['postId'];
    const { content } = await req.json();

    try {
        const newComment = await db
            .insert(userPostCommentTable)
            .values({
                userId,
                postId,
                content,
            })
            .returning();

        return Response.json(newComment, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return Response.json('An error occurred.', {
            status: 400,
        });
    }
}
