/**
 * Data that comes from powerbi containing all slicers and filters will be in csv format
 * This function cleans the data and returns type of filter and all values.
 */
export const transformData = (data: string): { type: string; values: string[] } => {
    const removeCommas = data.replaceAll(',', '');
    const rawData = removeCommas.split('\r\n');

    const type = rawData.shift() || '';

    // FilterCleanup
    const values = rawData.filter((data) => data !== '""' && data !== '');
    return {
        type,
        values,
    };
};
