import { FilterItem, FilterActionGroup } from '../Types/FilterItem';
/**
 * Creates filter action groups based on the fastest way to filter items
 * Might be overkill performance wise
 *
 * @param filterGroups
 * @returns
 */
export function createFilterActionGroups(
    filterGroups: Map<string, FilterItem[]>
): FilterActionGroup[] {
    const filters: FilterActionGroup[] = [];

    filterGroups.forEach((filterItems, filterGroupName) => {
        const checked: string[] = [];
        const unchecked: string[] = [];

        filterItems.forEach((element) => {
            if (element.checked) {
                checked.push(element.value);
            } else {
                unchecked.push(element.value);
            }
        });

        let actionGroup: FilterActionGroup;

        if (unchecked.length < checked.length) {
            actionGroup = {
                action: 'Unchecked',
                items: unchecked,
                type: filterGroupName,
            };
        } else {
            actionGroup = {
                action: 'Checked',
                items: checked,
                type: filterGroupName,
            };
        }

        filters.push(actionGroup);
    });
    return filters;
}
