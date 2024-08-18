import { NextRequest } from 'next/server';
import { preparedPostQuery } from '@/database/preparedQueries/post';

interface RequestPayload {
    params: { postId: string };
}

export async function GET(req: NextRequest, payload: RequestPayload) {
    const { postId } = payload.params;

    try {
        const [post] = await preparedPostQuery.execute({
            postId,
        });

        if (!post) {
            throw new Error('No post');
        }

        return Response.json(post, {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return Response.json('An error occurred.', {
            status: 400,
        });
    }
}
