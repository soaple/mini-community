'use client';

import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

function SessionProviderWrapper(props: PropsWithChildren) {
    const { children } = props;

    return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviderWrapper;
