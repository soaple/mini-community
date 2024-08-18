import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/database/db';
import { userPostTable } from '@/database/schema';
import { preparedPostsQuery } from '@/database/preparedQueries/post';
import authOptions from '@/lib/authOptions';

export async function GET(req: NextRequest) {
    try {
        const posts = await preparedPostsQuery.execute();

        return Response.json(posts, {
            status: 200,
        });
    } catch (error) {
        return Response.json('An error occurred.', {
            status: 400,
        });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return Response.json('An error occurred.', {
            status: 400,
        });
    }

    const { title, content } = await req.json();

    try {
        const newPost = await db
            .insert(userPostTable)
            .values({
                userId,
                title,
                content,
            })
            .returning();

        return Response.json(newPost, {
            status: 200,
        });
    } catch (error) {
        return Response.json('An error occurred.', {
            status: 400,
        });
    }
}
