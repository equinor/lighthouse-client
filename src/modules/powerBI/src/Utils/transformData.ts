/**
 * Data that comes from powerbi containing all slicers and filters will be in csv format
 * This function cleans the data and returns type of filter and all values.
 */
export const transformData = (data: string): { type: string; values: string[] } => {
    /**
     * Remove quotation marks
     * @example
     * input = Type
     *          ""
     *          "ARCH, Architectural"
     *         "ATEX, Ex inspection"
     *
     * output = Type
     *                              <---------- NB! new line here. meaning Blank filter value
     *          ARCH, Architectural
     *          ATEX, Ex inspection
     *          BT, Bolt Tension
     * */
    const removeQuotationMarks = data.replace(/['"]+/g, '');

    /**
     * Remove trailing white space and split by each line break
     * @example
     * input =  Type
     *                              <---------- NB! new line here
     *          ARCH, Architectural
     *          ATEX, Ex inspection
     *          BT, Bolt Tension
     *
     * output =  ['Type', '', 'ARCH, Architectural', 'ATEX, Ex inspection']
     * */
    const rawData = removeQuotationMarks.trim().split('\r\n');

    // Extract filter group type which is always first in the array
    const type = rawData.shift() || '';

    /**
     * Remove comma if it's the last character in the string
     * @example
     * input = [',', '000003,', '000006,']
     * output = ['', '000003', '000006']
     */
    const removeTrailingComma = rawData.map((value) => value.replace(/,\s*$/, ''));
    const values = removeTrailingComma.map((value) =>
        value === '""' || value === '' ? (value = '(Blank)') : value
    );
    return {
        type,
        values,
    };
};
