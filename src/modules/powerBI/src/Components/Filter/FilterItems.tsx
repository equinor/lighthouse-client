import { Checkbox } from '@equinor/eds-core-react';
import { useMemo } from 'react';
import { PowerBiFilter, PowerBiFilterItem } from '../../Types';

type CheckboxesProps = {
    activeFilters: (string | number | boolean)[];
    filter: PowerBiFilterItem;
    group: PowerBiFilter;
    handleOnChange: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
};
const Checkboxes = ({ activeFilters, filter, group, handleOnChange }: CheckboxesProps) => {
    const isActive = useMemo(() => {
        return activeFilters.includes(filter.value) ? true : false;
    }, [activeFilters, filter.value]);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Checkbox
                onChange={async () => {
                    await handleOnChange(group, filter);
                }}
                checked={isActive}
            />
            {filter.value}
        </div>
    );
};

type FilterItemsProps = {
    filterGroupVisible: string[] | undefined;
    slicerFilters: PowerBiFilter[];
    handleOnChange: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
    activeFilters: Record<string, (string | number | boolean)[]>;
};

export const FilterItems = ({
    filterGroupVisible,
    handleOnChange,
    slicerFilters,
    activeFilters,
}: FilterItemsProps) => {
    if (!filterGroupVisible) return null;
    return (
        <div style={{ display: 'flex' }}>
            {slicerFilters.map((group) => {
                if (filterGroupVisible.includes(group.type)) {
                    const filterValues = Object.values(group.value);
                    return (
                        <div key={group.type} style={{ height: '200px', overflow: 'scroll' }}>
                            {filterValues.map((filter) => {
                                return (
                                    <Checkboxes
                                        activeFilters={activeFilters[filter.type] || []}
                                        filter={filter}
                                        group={group}
                                        handleOnChange={handleOnChange}
                                        key={filter.value}
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
