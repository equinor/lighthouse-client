import { Checkbox } from '@equinor/eds-core-react';
import { useMemo } from 'react';
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
};
export const Item = ({ activeFilters, filter, group, handleOnChange }: ItemProps) => {
    const isActive = useMemo(() => {
        return activeFilters.includes(filter.value) ? true : false;
    }, [activeFilters, filter.value]);

    return (
        <CheckboxItem>
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
