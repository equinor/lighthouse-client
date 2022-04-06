/**
 * Takes in a number and returns it formatted as K for thousand
 * @param num
 * @returns
 */
export function kFormatter(num: number): string | number {
    return Math.abs(num) > 999
        ? `${(Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1)}K`
        : Math.sign(num) * Math.abs(num);
}
