import { SelectUserPostComment } from '@/database/schema';

interface CommentList {
    comments: SelectUserPostComment[];
}

function CommentList(props: CommentList) {
    const { comments } = props;

    return (
        <ul className='divide-y'>
            {comments.map((comment) => {
                return (
                    <li
                        key={comment.id}
                        className='p-2 flex gap-2 hover:bg-gray-50'>
                        <div>⮑</div>

                        <div className='space-y-2'>
                            <h1 className='text-md leading-none'>
                                {comment.content}
                            </h1>
                            <span className='text-sm text-gray-500'>
                                {comment.createdAt}
                            </span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default CommentList;
