'use client';

import { type PropsWithChildren } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type SessionProviderWrapperProps = PropsWithChildren<{
    session: Session | null;
}>;

function SessionProviderWrapper(props: SessionProviderWrapperProps) {
    const { session, children } = props;

    return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default SessionProviderWrapper;
