import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Mini Community',
    description: 'Welcome to mini community!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={cn(
                    'min-h-screen bg-background',
                    `${geistSans.variable} ${geistMono.variable} antialiased`
                )}>
                <main className='m-auto pt-20 max-w-lg'>{children}</main>
            </body>
        </html>
    );
}
