/** Function to format a number with space between every thousand
 * @example - 2400 -> 2 400
 * @example - 64205 -> 64 205
 */
export const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
