import { getGardenItems } from '../../../../components/ParkView/Components/VirtualGarden/utils';
import { GardenGroups } from '../../../../components/ParkView/Models/data';
import { McPackage } from '../../types';

export const getItemWidth = (garden: GardenGroups<McPackage>, groupByKey: string) => {
    let gardenItemList: McPackage[] = [];
    garden.forEach((column) => {
        const gardenItems = getGardenItems(column);
        gardenItems && gardenItemList.push(...(gardenItems as McPackage[]));
    });

    const longestKey = Math.max.apply(
        Math,
        gardenItemList.map((item) => {
            const titleLength = item?.[groupByKey] ? item[groupByKey].length : 0;
            return titleLength >= item.mcPkgNumber.length ? titleLength : item.mcPkgNumber.length;
        })
    );

    return Math.max(longestKey * 8 + 80, 102);
};
