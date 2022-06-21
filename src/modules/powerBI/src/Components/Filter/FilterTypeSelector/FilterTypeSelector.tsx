import { Icon, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Case } from '@equinor/JSX-Switch';
import { useState } from 'react';
import styled from 'styled-components';
import { Switch } from '../../../../../../components/JSXSwitch/Components/Switch';

const SHOW_ON_HOVER = 'add';
const HIDE_ON_HOVER = 'selected';
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
    const [searchText, setSearchText] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const handleInput = (e) => setSearchText(e.target.value.toString().toLowerCase());

    const handleEnterPress = () => {
        const matches = getFiltersMatchingSearchText();
        if (!matches.length) return;
        setVisibleFilters(matches);
    };

    const getFiltersMatchingSearchText = () =>
        allFilters.filter((name) => !searchText || name.toLowerCase().startsWith(searchText));

    return (
        <FilterTypeSelectorWrapper>
            <Header>
                <Switch>
                    <Case when={isSearchActive}>
                        <Search
                            onInput={handleInput}
                            value={searchText}
                            onKeyPress={(e) => e.key === 'Enter' && handleEnterPress()}
                            placeholder="Search for filters.."
                        />
                    </Case>
                    <Case when={!isSearchActive}>
                        <div>Filter types</div>
                        <Icon
                            onClick={() => setIsSearchActive(true)}
                            color={tokens.colors.interactive.primary__resting.hex}
                            name="search"
                        />
                    </Case>
                </Switch>
            </Header>
            <Options>
                {getFiltersMatchingSearchText().map((name) => {
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
    padding: 1px 16px;
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
    border-bottom: 2px solid #dcdcdc;
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
                    id={HIDE_ON_HOVER}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            )}
            <ToggleButton>
                <Icon
                    onClick={() => toggleSelected(name)}
                    name={isSelected ? 'remove' : 'add_circle_filled'}
                    id={SHOW_ON_HOVER}
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
    #${SHOW_ON_HOVER} {
        display: none;
    }

    &:hover #${SHOW_ON_HOVER} {
        display: initial;
    }

    #${HIDE_ON_HOVER} {
        display: initial;
    }

    &:hover #${HIDE_ON_HOVER} {
        display: none;
    }
`;
