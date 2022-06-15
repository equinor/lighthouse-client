import { FilterGroup } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterGroupeComponent } from '../FilterGroup/FilterGroup';
import { FilterGroups, FilterGroupWrapper, Wrapper } from './FilterView-style';

interface FilterViewProps {
    groups: string[];
}

export const FilterView = ({ groups }: FilterViewProps): JSX.Element => {
    const {
        filterGroupState: { getGroupValues },
    } = useFilterApiContext();

    return (
        <Wrapper>
            <FilterGroups>
                {groups
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
