export function signUp(email: string, password: string, name: string) {
    const params = { email, password, name };
    return fetch('/api/sign-up/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
}

export function createPost(title: string, content: string) {
    const params = { title, content };
    return fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
}

export function createPostComment(postId: string, content: string) {
    const params = { content };
    return fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
}
