import { Checkbox } from '@equinor/eds-core-react';
import { memo, useMemo } from 'react';
import { PowerBiFilter, PowerBiFilterItem } from '../../..';

type FilterItemsProps = {
    filterGroupVisible: string[] | undefined;
    slicerFilters: PowerBiFilter[];
    handleOnChangeTemp: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
    activeFilters: Record<string, string[]>;
};
type CheckboxesProps = {
    activeFilters: string[];
    filter: PowerBiFilterItem;
    group: PowerBiFilter;
    handleOnChangeTemp: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
};
const Checkboxes = ({ activeFilters, filter, group, handleOnChangeTemp }: CheckboxesProps) => {
    const isActive = useMemo(() => {
        return activeFilters.includes(filter.value) ? true : false;
    }, [activeFilters]);

    console.log('activefilter type', activeFilters);
    console.log('filter type', filter.type);
    console.log('is active', filter.value, isActive);
    return (
        <div
            key={filter.value}
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Checkbox
                onChange={async () => {
                    await handleOnChangeTemp(group, filter);
                }}
                checked={isActive}
            />
            {filter.value}
        </div>
    );
};
export const FilterItems = ({
    filterGroupVisible,
    handleOnChangeTemp,
    slicerFilters,
    activeFilters,
}: FilterItemsProps) => {
    if (!filterGroupVisible) return null;
    console.log('inside filteritems', activeFilters);
    return (
        <div style={{ display: 'flex' }}>
            {slicerFilters.map((group) => {
                if (filterGroupVisible.includes(group.type)) {
                    const a = Object.values(group.value);
                    return (
                        <div key={group.type} style={{ height: '200px', overflow: 'scroll' }}>
                            {a.map((filter, index) => {
                                console.log('blabla', activeFilters);
                                console.log('ddd', filter.type);
                                console.log('something', activeFilters[filter.type]);
                                console.log(
                                    'something2',
                                    Object.values(activeFilters).find((a) =>
                                        a.includes(filter.type)
                                    )
                                );
                                return (
                                    <Checkboxes
                                        activeFilters={activeFilters[filter.type] || []}
                                        filter={filter}
                                        group={group}
                                        handleOnChangeTemp={handleOnChangeTemp}
                                    />
                                );
                            })}
                        </div>
                    );
                } else return null;
            })}
        </div>
    );
};
