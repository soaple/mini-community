import { nanoid } from 'nanoid';
import { sql, relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
    id: text('id', { length: 21 })
        .$defaultFn(() => nanoid(21))
        .primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    name: text('name').notNull(),
    createdAt: text('created_at')
        .notNull()
        .$default(() => sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at')
        .notNull()
        .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const userPostTable = sqliteTable('user_post', {
    id: text('id', { length: 21 })
        .$defaultFn(() => nanoid(21))
        .primaryKey(),
    userId: text('user_id', { length: 21 })
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdAt: text('created_at')
        .notNull()
        .$default(() => sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at')
        .notNull()
        .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const userPostCommentTable = sqliteTable('user_post_comment', {
    id: text('id', { length: 21 })
        .$defaultFn(() => nanoid(21))
        .primaryKey(),
    userId: text('user_id', { length: 21 })
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' }),
    postId: text('post_id', { length: 21 })
        .notNull()
        .references(() => userPostTable.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    createdAt: text('created_at')
        .notNull()
        .$default(() => sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at')
        .notNull()
        .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const userRelations = relations(userTable, ({ many }) => ({
    posts: many(userPostTable),
    comments: many(userPostCommentTable),
}));

export const postRelations = relations(userPostTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [userPostTable.userId],
        references: [userTable.id],
    }),
    comments: many(userPostCommentTable),
}));

export const commentRelations = relations(userPostCommentTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userPostCommentTable.userId],
        references: [userTable.id],
    }),
    post: one(userPostTable, {
        fields: [userPostCommentTable.postId],
        references: [userPostTable.id],
    }),
}));

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertUserPost = typeof userPostTable.$inferInsert;
export type SelectUserPost = typeof userPostTable.$inferSelect & {
    user: Pick<SelectUser, 'id' | 'name'>;
    comments: SelectUserPostComment[];
};

export type InsertUserPostComment = typeof userPostCommentTable.$inferInsert;
export type SelectUserPostComment = typeof userPostCommentTable.$inferSelect;
