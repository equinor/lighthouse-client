import { Data, DataSet } from '../../Models/data';

export function cancelTimeout(handle: { id: number | null }) {
    handle && handle.id && cancelAnimationFrame(handle.id);
}
export function requestTimeout(fn: () => void, delay: number) {
    const start = Date.now();

    function loop() {
        if (Date.now() - start >= delay) {
            fn.call(null);
        } else {
            handle.id = requestAnimationFrame(loop);
        }
    }
    const handle = {
        id: requestAnimationFrame(loop),
    };

    return handle;
}
type PackageWithDescription<T extends unknown> = T & {
    description: string;
};
/** Type guard for a package object checking whether or not it contains a description property */
function packageHasDescription<T extends unknown>(
    packageObj: T
): packageObj is PackageWithDescription<T> {
    if ((packageObj as PackageWithDescription<T>).description) {
        return true;
    } else {
        return false;
    }
}

/**
 * Function for extracting the longest description of packages inside one column
 * @param columnData One column from the garden
 * @returns Longest description string
 */
export const getLongestDescription = <T extends unknown>(columnData: T[]) => {
    let longest = '';
    columnData.forEach((e: T) =>
        packageHasDescription(e) && e.description.length > longest.length
            ? (longest = e.description)
            : null
    );
    return longest;
};
/**
 * Function for estimating the extra width it takes to display the descriptions of packages.
 * @param columnData One column from the garden
 * @returns A calculated width based on string length and font
 */
export const getDescriptionWidth = <T extends unknown>(columnData: T[] | null): number => {
    if (!columnData) {
        return 0;
    }
    const longestDescription = getLongestDescription(columnData);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.font = '16px Equinor, sans-serif';
    const width = ctx!.measureText(longestDescription).width;
    return width;
};

const getSubGroupItems = <T extends unknown>(garden: DataSet<T>, subGroupKey: string): T[] => {
    let items: T[] = [];
    const subGroup = garden.subGroups[subGroupKey];
    if (subGroup?.subGroupCount === 0) {
        items.push(...subGroup.items);
    } else {
        const newSubGroupKeys = Object.keys(subGroup.subGroups);
        for (let newKey of newSubGroupKeys) {
            items.push(...getSubGroupItems(subGroup, newKey));
        }
    }
    return items;
};

export const getGardenItems = <T extends unknown>(garden: DataSet<T>): T[] | null => {
    const gardenHasNoItems = garden.count === 0 && garden.subGroupCount === 0;
    if (gardenHasNoItems) return null;
    const gardenHasNoSubGroups = garden.items.length > 0;
    if (gardenHasNoSubGroups) return garden.items;
    let items: T[] = [];
    const subGroupKeys = Object.keys(garden.subGroups);

    for (let subKey of subGroupKeys) {
        items.push(...getSubGroupItems(garden, subKey));
    }
    return items;
};
