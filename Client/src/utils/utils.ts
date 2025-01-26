import { SearchParams } from '../types';

/**
 * Отфильтровать параметры поиска и фильтрации (для URL).
 * @param searchParams Фильтруемые параметры.
 * @returns Отфильтрованные параметры.
 */
export function searchParamsFilter(searchParams: SearchParams) {
    const filtered: SearchParams = {}
    if (searchParams.search) filtered.search = searchParams.search;
    if (searchParams.filterBody) filtered.filterBody = searchParams.filterBody;
    if (searchParams.filterEmail) filtered.filterEmail = searchParams.filterEmail;
    return filtered;
}

/**
 * Сравнить, изменились ли параметры поисковой строки.
 * @param searchParams старые параметры поисковой строки.
 * @param newSearchParams новые параметры поисковой строки для замены.
 * @returns результат сравнения: true - если изменились, false - если нет.
 */
export function isUrlFilterChanged(searchParams: URLSearchParams, newSearchParams: SearchParams) {
    if (searchParams.get('search') !== newSearchParams.search ||
        searchParams.get('filterBody') !== newSearchParams.filterBody ||
        searchParams.get('filterEmail') !== newSearchParams.filterEmail) return true;
    return false;
}