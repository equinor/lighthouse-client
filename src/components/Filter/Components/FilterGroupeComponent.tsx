import { Checkbox } from "@equinor/eds-core-react"
import { tokens } from "@equinor/eds-tokens"
import React from "react"
import styled from "styled-components"
import { FilterGroup, FilterItemCheck } from "../Types/FilterItem"
import { FilterItemComponent } from "./FilterItem/FilterItem"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: .5em;
    max-width: 200px;
    word-wrap: break-word;
    background-color: ${tokens.colors.ui.background__light.rgba};

    label{
        font-size: 1rem;
        padding: 0;
        span {
            padding: .1rem;

        }
        svg{
            height: 16px;
            width: 16px;
        }
    }
`
interface FilterGroupeComponentProps {
    filterGroup: FilterGroup,
    filterItemCheck: FilterItemCheck
}


export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({ filterGroup, filterItemCheck }: FilterGroupeComponentProps) => {

    return (
        <Wrapper>
            <Checkbox title={"All"} label={"All"} checked={filterGroup.all} onChange={() => { console.log("check") }} />
            {
                Object.keys(filterGroup.value).map((key) => {
                    const item = filterGroup.value[key];
                    return (
                        <>
                            {<FilterItemComponent
                                key={item.value}
                                filterItem={item}
                                filterItemCheck={filterItemCheck}
                            />}
                        </>
                    );
                })
            }
        </Wrapper>
    )
}