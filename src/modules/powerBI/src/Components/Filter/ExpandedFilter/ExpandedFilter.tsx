import { PowerBiFilter } from '../../../Types';
import { FilterItems } from '../FilterItems';
import { FilterController } from '../PowerBIFilter';
import { FilterItemsWrapper } from '../Styles';

interface ExpandedFilterProps {
    controller: FilterController;
}

export function ExpandedFilter({ controller }: ExpandedFilterProps): JSX.Element {
    const { activeFilters, handleOnChange, slicerFilters, visibleFilters, setVisibleFilters } =
        controller;

    return (
        <FilterItemsWrapper>
            {visibleFilters.map((groupName) => (
                <FilterItems
                    controller={controller}
                    handleOnChange={handleOnChange}
                    handleOnSelectAll={controller.handleOnSelectAll}
                    activeFilters={activeFilters}
                    group={slicerFilters.find((s) => s.type === groupName) as PowerBiFilter}
                    key={groupName}
                />
            ))}
        </FilterItemsWrapper>
    );
}
