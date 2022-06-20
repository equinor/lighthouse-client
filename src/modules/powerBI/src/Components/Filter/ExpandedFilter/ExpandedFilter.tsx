import { PowerBiFilter } from '../../../Types';
import { FilterItems } from '../FilterItems';
import { FilterTypeSelector } from '../FilterTypeSelector/FilterTypeSelector';
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
            <FilterTypeSelector
                allFilters={slicerFilters.map((s) => s.type)}
                setVisibleFilters={setVisibleFilters}
                visibleFilters={visibleFilters}
            />
            {visibleFilters.map((groupName) => (
                <FilterItems
                    handleOnChange={handleOnChange}
                    handleOnSelectAll={() => Promise.resolve(void 0)}
                    activeFilters={activeFilters}
                    group={slicerFilters.find((s) => s.type === groupName) as PowerBiFilter}
                    key={groupName}
                />
            ))}
        </FilterItemsWrapper>
    );
}
