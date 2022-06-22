import { Icon, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Case } from '@equinor/JSX-Switch';
import { useState } from 'react';
import { Switch } from '../../../../../../components/JSXSwitch/Components/Switch';
import { FilterTypeOption } from './FilterTypeOptions';
import { FilterTypeSelectorWrapper, Header, Options } from './filterTypeSelector.styles';

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
