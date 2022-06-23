import { FilterGroup } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterGroupeComponent } from '../FilterGroup/FilterGroup';
import { FilterGroups, FilterGroupWrapper, Wrapper } from './FilterView-style';

interface FilterViewProps {
    groups: string[];
    visibleFilterGroups: string[];
    setVisibleFilterGroups: (newVal: string[]) => void;
}

export const FilterView = ({
    groups,
    setVisibleFilterGroups,
    visibleFilterGroups,
}: FilterViewProps): JSX.Element => {
    const {
        filterGroupState: { getGroupValues },
    } = useFilterApiContext();

    return (
        <Wrapper>
            <FilterGroups>
                {groups
                    .filter((s) => visibleFilterGroups.includes(s))
                    .sort()
                    .map(
                        (groupName): FilterGroup => ({
                            name: groupName,
                            values: getGroupValues(groupName),
                        })
                    )
                    .map((filterGroup, index) => (
                        <FilterGroupWrapper key={`col-${filterGroup.name}-${index}`}>
                            <FilterGroupeComponent filterGroup={filterGroup} />
                        </FilterGroupWrapper>
                    ))}
            </FilterGroups>
        </Wrapper>
    );
};
