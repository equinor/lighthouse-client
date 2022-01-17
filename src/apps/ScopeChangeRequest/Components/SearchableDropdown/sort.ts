import levenshtein from 'fast-levenshtein';
import { TypedSelectOption } from '../../Api/Search/searchType';

/**
 * Sort function using levenshtein distance
 * @param a
 * @param b
 * @param searchValue
 * @returns
 */
export function sort(a: TypedSelectOption, b: TypedSelectOption, searchValue: string): number {
    return (
        levenshtein.get(replaceCharacter(a.searchValue), replaceCharacter(searchValue)) -
        levenshtein.get(replaceCharacter(b.searchValue), replaceCharacter(searchValue))
    );
}

/**
 * Replaces #'s with |'s because levenshtein ignores #'s
 * @param a
 * @returns
 */
export function replaceCharacter(a: string): string {
    return a.replace('#', 'a');
}
