'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CommentList from '@/components/lists/CommentList';
import { createPostComment } from '@/lib/apiManager';
import { SelectUserPost } from '@/database/schema';

interface PostViewPageProps {
    post: SelectUserPost;
}

function PostViewPage(props: PostViewPageProps) {
    const { post } = props;

    const session = useSession();
    const router = useRouter();

    const [comment, setComment] = useState('');

    const handleClickWriteComment = useCallback(async () => {
        try {
            const response = await createPostComment(post.id, comment);
            if (response.ok) {
                setComment('');
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    }, [post, comment, router]);

    return (
        <div>
            <div className='mt-4 p-2 flex items-center justify-between border-b'>
                <div className='space-y-1'>
                    <h1 className='text-md leading-none font-semibold'>
                        {post.title}
                    </h1>
                    <span className='text-sm text-gray-500'>
                        {post.createdAt}
                    </span>
                </div>
                <span className='text-sm text-gray-700'>{post.user.name}</span>
            </div>

            <section className='min-h-40 p-2 border-b'>
                <p className='py-2 text-md'>{post.content}</p>
            </section>

            <CommentList comments={post.comments} />

            <div className='mt-4 grid gap-y-2'>
                {session.status !== 'authenticated' ? (
                    <Button
                        asChild
                        size='sm'>
                        <Link href='/sign-in'>Sign in to write comment</Link>
                    </Button>
                ) : (
                    <>
                        <Textarea
                            placeholder='Enter comment...'
                            value={comment}
                            onChange={(event) => {
                                setComment(event.target.value);
                            }}
                        />
                        <Button
                            disabled={comment.length === 0}
                            onClick={handleClickWriteComment}>
                            Write comment
                        </Button>
                    </>
                )}

                <Button
                    asChild
                    size='sm'
                    variant='outline'>
                    <Link href='/'>⬅︎ Back to list</Link>
                </Button>
            </div>
        </div>
    );
}

export default PostViewPage;
