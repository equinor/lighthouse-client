import { Button, Checkbox, Search } from "@equinor/eds-core-react"
import { useEffect, useMemo, useState } from "react"
import Icon from "../../../Icon/Icon"
import { useFilter } from "../../Hooks/useFilter"
import { FilterGroup } from "../../Types/FilterItem"
import { FilterGroupeComponent } from "../FilterGroup/FilterGroup"
import { Title } from "../FilterGroup/FilterGroup-Styles"
import { FilterGroups, FilterGroupWrapper, FilterSelect, SelectBar, Wrapper } from "./FilterView-style"




function createTypeKeys(filter: FilterGroup[]): string[] {
    return filter.map(item => item.type)
}


function SearchFilterKeys(keys: string[], filerValue: string): string[] {
    return keys.filter(key => key.toLowerCase().includes(filerValue.toLowerCase()))
}




export const FilterView = () => {
    const { filter, filterItemCheck } = useFilter();
    const filterKeys = useMemo(() => createTypeKeys(filter), [filter])
    const [activeFilterData, setActiveFilterData] = useState<string[]>([])
    const [activeFilter, setActiveFilter] = useState<FilterGroup[]>([]);
    const [filterSearchValue, setFilterSearchValue] = useState("");
    const [isFilterSelectActive, setIsFilterSelectActive] = useState(false);

    useEffect(() => {
        if (activeFilterData.length === 0) {
            setActiveFilterData(filterKeys)
        }
    }, [filterKeys])

    useEffect(() => {
        setActiveFilter(filter.filter(i => activeFilterData.includes(i.type)));
    }, [filter, activeFilterData])




    function handleOnChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const value = event.target.value
        setActiveFilterData(activeFilterData => {
            if (activeFilterData.includes(value))
                return activeFilterData.filter(k => k !== value)
            else
                return [...activeFilterData, value]
        })
    }

    function handleOnSearchChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const value = event.target.value
        setFilterSearchValue(value)
    }

    function handleToggleFilerSelect() {
        setIsFilterSelectActive(state => !state)
    }

    return (
        <Wrapper>
            <SelectBar>
                <Button variant="ghost_icon" onClick={handleToggleFilerSelect}>
                    <Icon name={"settings"} />
                </Button>
            </SelectBar>
            {isFilterSelectActive && <FilterSelect >
                <Title>Select Filter Type</Title>
                <Search

                    aria-label="filer group"
                    id="search-normal"
                    placeholder="Search"
                    onChange={handleOnSearchChange}
                />

                {
                    SearchFilterKeys(filterKeys, filterSearchValue).map((key, i) => (
                        <div key={key + i}>
                            <Checkbox title={key} label={key} value={key} checked={activeFilterData.includes(key)} onChange={handleOnChange} />
                        </div>
                    ))
                }

            </FilterSelect>}
            <FilterGroups>
                {
                    activeFilter.map((filterGroup: FilterGroup, index) => (
                        <FilterGroupWrapper key={`col-${filterGroup}-${index}`} >

                            <FilterGroupeComponent
                                filterGroup={filterGroup}
                                filterItemCheck={filterItemCheck}
                            />
                        </FilterGroupWrapper>
                    ))
                }
            </FilterGroups>
        </Wrapper>
    )
}