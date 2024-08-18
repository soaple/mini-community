import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { type SelectUserPost } from '@/database/schema';

function usePosts() {
    const { isLoading, data, error, mutate } = useSWR<SelectUserPost[]>(
        '/api/posts',
        fetcher
    );

    return {
        isLoading,
        posts: data,
        error,
        mutate,
    };
}

export default usePosts;
