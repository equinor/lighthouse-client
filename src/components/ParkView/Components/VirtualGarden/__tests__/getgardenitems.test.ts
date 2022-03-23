import { getGardenItems } from '../utils/getGardenItems';
import {
    inputNoSubGroups,
    gardenOneGroupAllExpanded,
    gardenOneGroupExpandedOneGroupNotExpanded,
    gardenTwoGroupsAllExpanded,
    gardenThreeGroupsAllExpanded,
    gardenGroupsWithItemsInsideDifferentGroups,
} from '../mock/gardendata';
describe('GetGardenItems', () => {
    it('should return all items when there are no subgroups', () => {
        const output = getGardenItems(inputNoSubGroups['2022-11']);
        expect(output).toHaveLength(1);
    });

    it('should return all items when having expanded subgroups', () => {
        const output = getGardenItems(gardenOneGroupAllExpanded['2022-11']);
        const output2 = getGardenItems(gardenTwoGroupsAllExpanded['2022-11']);
        const output3 = getGardenItems(gardenThreeGroupsAllExpanded['2022-11']);
        expect(output).toHaveLength(3);
        expect(output2).toHaveLength(1);
        expect(output3).toHaveLength(1);
    });
    it('should return subgroup value as well as items if boolean true is passed as second argument', () => {
        const output = getGardenItems(gardenOneGroupAllExpanded['2022-11'], true);
        expect(output).toHaveLength(4);
    });

    it('should not return items if subgroup is expanded', () => {
        const output = getGardenItems(gardenOneGroupExpandedOneGroupNotExpanded['2022-11']);
        const output2 = getGardenItems(gardenGroupsWithItemsInsideDifferentGroups['2021-48']);
        expect(output).toHaveLength(0);
        expect(output2).toHaveLength(1);
    });

    it('should not return items and children subgroups values if parent subgroup is not expanded', () => {
        const output = getGardenItems(gardenGroupsWithItemsInsideDifferentGroups['2021-50'], true);
        expect(output).toHaveLength(1);
    });
});
