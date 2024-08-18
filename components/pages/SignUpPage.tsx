'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/apiManager';

function SignUpPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');

    const handleClickSignUp = useCallback(async () => {
        if (!email || !password || !passwordConfirm || !name) {
            alert('Please enter all information.');
        }

        try {
            const response = await signUp(email, password, name);

            if (response.ok) {
                router.replace('/sign-in');
            }
        } catch (error) {
            console.log(error);
        }
    }, [email, password, passwordConfirm, name, router]);

    return (
        <div>
            <p className='text-2xl font-bold text-center'>Sign Up</p>

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
                <Input
                    type='password'
                    placeholder='Password Confirm'
                    value={passwordConfirm}
                    onChange={(event) => {
                        setPasswordConfirm(event.target.value);
                    }}
                />
                <Input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <Button
                    className='w-full'
                    onClick={handleClickSignUp}>
                    Sign Up
                </Button>
                <Button
                    asChild
                    variant='outline'
                    className='w-full'>
                    <Link href='/sign-in'>Sign In</Link>
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

export default SignUpPage;
