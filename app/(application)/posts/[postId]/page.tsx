import { notFound } from 'next/navigation';
import { preparedPostQuery } from '@/database/preparedQueries/post';
import SessionProviderWrapper from '@/components/base/SessionProviderWrapper';
import PostViewPage from '@/components/pages/PostViewPage';

interface PageProps {
    params: { postId: string };
}

async function Page(props: PageProps) {
    const { params } = props;
    const { postId } = params;

    const [post] = await preparedPostQuery.execute({
        postId,
    });

    if (!post) {
        return notFound();
    }

    return (
        <SessionProviderWrapper>
            <PostViewPage post={post} />
        </SessionProviderWrapper>
    );
}

export default Page;
