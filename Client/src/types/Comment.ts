/** Тип комментария. */
export type Comment = {
    /** ID комментария. */
    id: number;

    /** Название комментария. */
    name: string;

    /** Автор комментария (email). */
    email: string;

    /** Тело комментария. */
    body: string;
};