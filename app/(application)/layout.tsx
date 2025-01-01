import { type PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import Header from '@/components/base/Header';
import authOptions from '@/lib/authOptions';

async function ApplicationLayout(props: PropsWithChildren) {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Header session={session} />
            {props.children}
        </>
    );
}

export default ApplicationLayout;
