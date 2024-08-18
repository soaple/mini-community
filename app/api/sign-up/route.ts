import { eq } from 'drizzle-orm';
import { db } from '@/database/db';
import { userTable } from '@/database/schema';

interface RequestPayload {
    params: {};
    searchParams: {};
}

export async function POST(request: Request, payload: RequestPayload) {
    const { email, password, name } = await request.json();

    try {
        const result = await db.transaction(async (tx) => {
            const [existingUser] = await db
                .select()
                .from(userTable)
                .where(eq(userTable.email, email));

            if (existingUser) {
                throw new Error('An email that already exists.');
            }

            const newUser = await tx
                .insert(userTable)
                .values({
                    email,
                    password,
                    name,
                })
                .returning();

            if (!newUser) {
                throw new Error('Creating new user is failed.');
            }

            return newUser;
        });

        if (!result) {
            throw new Error('Creating new user is failed.');
        }

        return Response.json(result, { status: 200 });
    } catch (error: any) {
        return Response.json(error.message, { status: 400 });
    }
}
