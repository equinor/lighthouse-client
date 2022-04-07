import { useEffect, useState } from 'react';
import { useWorkSpace } from '../../../../Core/WorkSpace/src/WorkSpaceApi/useWorkSpace';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterGroupeComponent } from '../FilterGroup/FilterGroup';
import { FilterTypes } from './FilterTypes';
import { FilterGroups, FilterGroupWrapper, Wrapper } from './FilterView-style';
import { createTypeKeys } from './utils';

interface FilterViewProps {
    isActive: boolean;
}

export const FilterView = ({ isActive }: FilterViewProps): JSX.Element => {
    const {
        filterState: { getAllFilterGroups },
    } = useFilterApiContext();

    const allFilterGroups = getAllFilterGroups();
    const filterGroupNames = createTypeKeys(allFilterGroups);

    const [visibleFilters, setVisibleFilters] = useState<string[]>(filterGroupNames);

    const { filterOptions } = useWorkSpace();

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        visibleFilters.includes(value)
            ? setVisibleFilters((prev) => prev.filter((v) => v !== value))
            : setVisibleFilters((prev) => [...prev, value]);
    }

    const isAllVisible = visibleFilters.length === getAllFilterGroups().length;

    const handleAllClick = () => {
        isAllVisible
            ? setVisibleFilters([])
            : setVisibleFilters(allFilterGroups.map(({ name }) => name));
    };

    useEffect(() => {
        if (!filterOptions) return;
        setVisibleFilters(
            filterOptions.filter(({ defaultHidden }) => !defaultHidden).map(({ name }) => name)
        );
    }, [filterOptions]);

    return (
        <Wrapper isActive={isActive}>
            {isActive && (
                <>
                    <FilterTypes
                        visibleFilters={visibleFilters}
                        handleAllClick={handleAllClick}
                        handleOnChange={handleOnChange}
                    />

                    <FilterGroups>
                        {visibleFilters.map((key: string, index) => {
                            const filterGroup = allFilterGroups.find(({ name }) => name === key);
                            if (!filterGroup) return;
                            return (
                                <FilterGroupWrapper key={`col-${key}-${index}`}>
                                    <FilterGroupeComponent filterGroup={filterGroup} />
                                </FilterGroupWrapper>
                            );
                        })}
                    </FilterGroups>
                </>
            )}
        </Wrapper>
    );
};
