import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PostList from '@/components/lists/PostList';

async function MainPage() {
    return (
        <>
            <section className='mt-4'>
                <PostList />
            </section>

            <Button
                asChild
                size='sm'
                className='w-full mt-4'>
                <Link href='/post-write'>Write Post</Link>
            </Button>
        </>
    );
}

export default MainPage;
