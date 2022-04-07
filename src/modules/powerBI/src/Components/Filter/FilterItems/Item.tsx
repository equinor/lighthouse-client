import { Checkbox } from '@equinor/eds-core-react';
import { useMemo, memo } from 'react';
import { PowerBiFilter, PowerBiFilterItem } from '../../../Types';
import { CheckboxItem } from './Styles';

type ItemProps = {
    activeFilters: (string | number | boolean)[];
    filter: PowerBiFilterItem;
    group: PowerBiFilter;
    handleOnChange: (
        group: PowerBiFilter,
        filter: PowerBiFilterItem,
        singleClick?: boolean
    ) => Promise<void>;
    virtualItemStart: number;
    virtualItemSize: number;
};
const FilterItem = ({
    activeFilters,
    filter,
    group,
    handleOnChange,
    virtualItemSize,
    virtualItemStart,
}: ItemProps) => {
    const isActive = useMemo(() => {
        return activeFilters.includes(filter.value) ? true : false;
    }, [activeFilters, filter.value]);

    return (
        <CheckboxItem
            style={{
                transform: `translateY(${virtualItemStart}px)`,
                height: `${virtualItemSize}px`,
            }}
        >
            <Checkbox
                onChange={async () => {
                    await handleOnChange(group, filter);
                }}
                checked={isActive}
            />
            <label
                onClick={async () => {
                    await handleOnChange(group, filter, true);
                }}
            >
                {filter.value}
            </label>
        </CheckboxItem>
    );
};
export const Item = memo(FilterItem);
