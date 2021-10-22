import styled from "styled-components"
import { useFilter } from "../Hooks/useFilter"
import { FilterGroup } from "../Types/FilterItem"
import { FilterGroupeComponent } from "./FilterGroupeComponent"

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 200px;
    overflow: scroll;
    
`

export const FilterView = () => {
    const { filter, filterItemCheck } = useFilter()
    return (
        <Wrapper>
            {
                filter.map((filterGroup: FilterGroup, index) => (
                    <FilterGroupeComponent
                        key={`col-${filterGroup}-${index}`}
                        filterGroup={filterGroup}
                        filterItemCheck={filterItemCheck}
                    />
                ))
            }
        </Wrapper>
    )
}