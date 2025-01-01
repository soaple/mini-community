'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClickSignIn = useCallback(() => {
        if (!email || !password) {
            alert('Please enter all information.');
        }

        signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/',
        });
    }, [email, password]);

    return (
        <div>
            <p className='text-2xl font-bold text-center'>Sign In</p>

            <div className='mt-8 space-y-4'>
                <Input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <Input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <Button
                    className='w-full'
                    onClick={handleClickSignIn}>
                    Sign In
                </Button>
                <Button
                    asChild
                    variant='outline'
                    className='w-full'>
                    <Link href='/sign-up'>Sign Up</Link>
                </Button>
                <Button
                    asChild
                    variant='link'
                    className='w-full'>
                    <Link href='/'>Back to home</Link>
                </Button>
            </div>
        </div>
    );
}

export default SignInPage;
