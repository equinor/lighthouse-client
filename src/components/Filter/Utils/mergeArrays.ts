/**
 * Merges two arrays faster than spread operator
 * @param array1
 * @param array2
 * @returns merged array
 */
export function mergeArrays<T>(array1: T[], array2: T[]): T[] {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw new Error('One or more arguments are not of type array');
    }

    const mergedArray = new Array(array1.length + array2.length);

    for (let i = 0; i < array1.length; i++) {
        mergedArray[i] = array1[i];
    }
    let bufferIndex = array1.length;
    for (let i = 0; i < array2.length; i++) {
        mergedArray[bufferIndex] = array2[i];
        bufferIndex++;
    }

    return mergedArray;
}
