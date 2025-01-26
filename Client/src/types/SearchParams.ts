/** Тип набора поисковых параметров. */
export type SearchParams = {
    /** Поисковая запись по имени. */
    search?: string;

    /** Поисковая запись по Email. */
    filterEmail?: string;

    /** Поисковая запись по телу комментария. */
    filterBody?: string
}