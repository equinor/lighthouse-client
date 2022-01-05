/**
 *  To be able to clean as components as clean as possible we have provided a PopupFilter Component
 *  The components was made with the filter in the TableHeader Menu in mind but can be used in anyplace where
 *  on need a specific filter groupe present.
 *
 *  To be able to use the PopupFilter it has to be used inside the FilterProvider.
 *  the only prop needed to retrieve a filter is a object property key. if the key is present the
 *  filter will be displayed if not the component wil return an empty JSX. element.
 */

import { useMemo } from 'react';
import { useFilter } from '../../Hooks/useFilter';
import { FilterGroupeComponent } from '../FilterGroup/FilterGroup';

export interface PopupFilterProps {
    filterId: string;
}

export function PopupFilter({ filterId }: PopupFilterProps): JSX.Element {
    const { filterData, filterItemCheck } = useFilter();
    const filter = useMemo(() => filterData[filterId], [filterData, filterId]);

    if (!filter) return <></>;

    return (
        <FilterGroupeComponent
            filterGroup={filter}
            filterItemCheck={filterItemCheck}
            hideTitle={true}
        />
    );
}
