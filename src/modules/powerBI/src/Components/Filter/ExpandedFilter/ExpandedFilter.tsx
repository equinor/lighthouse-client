import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
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
interface FilterTypeSelectorProps {
    visibleFilters: string[];
    setVisibleFilters: (visibleFilters: string[]) => void;
    allFilters: string[];
}
export function FilterTypeSelector({
    allFilters,
    setVisibleFilters,
    visibleFilters,
}: FilterTypeSelectorProps): JSX.Element {
    return (
        <FilterTypeSelectorWrapper>
            <Header>
                <div>Filter types</div>
                <Icon color={tokens.colors.interactive.primary__resting.hex} name="search" />
            </Header>
            <Options>
                {allFilters.map((name) => {
                    const isSelected = visibleFilters.includes(name);
                    return (
                        <FilterTypeOption
                            key={name}
                            isSelected={isSelected}
                            name={name}
                            toggleSelected={() => {
                                if (isSelected) {
                                    setVisibleFilters(visibleFilters.filter((s) => s !== name));
                                } else {
                                    setVisibleFilters([...visibleFilters, name]);
                                }
                            }}
                        />
                    );
                })}
            </Options>
        </FilterTypeSelectorWrapper>
    );
}

const FilterTypeSelectorWrapper = styled.div`
    padding: 1px 12px;
    background-color: white;
    min-width: 300px;
    overflow: scroll;
`;

const Options = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: white;
`;

const Header = styled.div`
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background-color: #f7f7f7;
`;

interface FilterTypeOptionProps {
    isSelected: boolean;
    toggleSelected: (name: string) => void;
    name: string;
}
const FilterTypeOption = ({ isSelected, name, toggleSelected }: FilterTypeOptionProps) => {
    return (
        <FilterTypeOptionWrapper>
            {name}

            {isSelected && (
                <Icon
                    name="check"
                    id="selected"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            )}
            <ToggleButton>
                <Icon
                    onClick={() => toggleSelected(name)}
                    name={isSelected ? 'remove' : 'add_circle_filled'}
                    id={'add'}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </ToggleButton>
        </FilterTypeOptionWrapper>
    );
};

const ToggleButton = styled.div`
    cursor: pointer;
`;

const FilterTypeOptionWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    height: 24px;

    &:hover {
        background-color: #f7f7f7;
    }
    #add {
        display: none;
    }

    &:hover #add {
        display: initial;
    }

    #selected {
        display: initial;
    }

    &:hover #selected {
        display: none;
    }
`;
