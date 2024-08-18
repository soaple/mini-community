'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { createPost } from '@/lib/apiManager';

function PostWritePage() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClickWritePost = useCallback(async () => {
        try {
            const response = await createPost(title, content);
            if (response.ok) {
                router.replace('/');
            }
        } catch (error) {
            console.log(error);
        }
    }, [title, content, router]);

    return (
        <div className='space-y-2 grid'>
            <Input
                placeholder='Title'
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
            <Textarea
                className='min-h-40'
                placeholder='Write content...'
                value={content}
                onChange={(event) => {
                    setContent(event.target.value);
                }}
            />
            <Button
                disabled={title.length === 0 || content.length === 0}
                onClick={handleClickWritePost}>
                Write post
            </Button>
        </div>
    );
}

export default PostWritePage;
