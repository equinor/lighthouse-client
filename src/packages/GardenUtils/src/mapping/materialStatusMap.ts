import { MaterialStatus } from '..';

export const hasProperty = <T extends unknown>(
    item: T,
    property: PropertyKey
): property is keyof T => {
    return item?.[property as keyof T] !== undefined ? true : false;
};

const extractNumbersFromString = (s: string) => {
    const numbersFromString = s.replace(/[^0-9]+/, '');
    return numbersFromString;
};

const removeNumbersFromString = (s: string) => {
    const removedNumbers = s.replace(/[0-9]/g, '');
    return removedNumbers;
};

/**
 * Function to transform material status into valid statuses that we can use for other records
 * @param matStatus
 * @returns Added '0' prefix if the material status number is less than 10, e.g. m1 returns M01
 */
export const prepMatStatus = (matStatus: string): string => {
    // Extracting the numbers from the status (e.g. M01 -> 01, M2 -> 2)
    let statusNumber = extractNumbersFromString(matStatus);
    const statusLetters = removeNumbersFromString(matStatus);

    if (statusNumber.length === 1) {
        // We only want to deal with the statuses with the 0 prefix (e.g 2 -> 02), but not if
        // the number is  > 10.
        statusNumber = '0' + statusNumber;
    }
    // Adding the status letters of the original material status to the new status + the (altered) statusNumber
    const newMatStatus = statusLetters.toUpperCase() + statusNumber;

    return newMatStatus;
};

/**
 * Dictionary for mapping material statuses to readable string.
 */
const materialStatusMap: Partial<Record<MaterialStatus, string>> = {
    M10: 'Material requested to job site',
    M12: 'Material received on job site',
    M02: 'Materials linked to Smartpack/Jobcard',
    M06: 'Material partly delivered',
    M07: 'Materials fully delivered',
    M09: 'Material returned',
    MN: 'No Material required',
    MN1: 'Additional material to be issued Offshore from Min/Max Stock',
    MNX1: 'Materials not linked to Smartpack/Jobcard',
    MNX2: 'Materials partially linked to Smartpack/Jobcard',
};
/**
 * Function to retrieve a value from the `MAT_STATUS_MAP` record. Will return undefined if material status key is invalid
 * @param matStatus Material status from a workorder
 */
export function getMappedMaterialStatus(matStatus: string): string | undefined;
/**
 * Function to retrieve a value from a material status record. Will return undefined if material status key is invalid.
 * @param matStatus Material status from a workorder
 * @param matMap The material status record to use for mapping
 */
export function getMappedMaterialStatus(
    matStatus: string,
    matMap: Record<string, string>
): string | undefined;

export function getMappedMaterialStatus(
    materialStatus: string,
    matMap?: Record<string, string>
): string | undefined {
    const materialMap = matMap ? matMap : materialStatusMap;
    if (hasProperty(materialMap, materialStatus)) {
        return materialMap[materialStatus];
    } else {
        const newMatStatus = prepMatStatus(materialStatus);

        if (hasProperty(materialMap, newMatStatus)) {
            return materialMap[newMatStatus];
        } else {
            return undefined;
        }
    }
}
