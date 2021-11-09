import { tokens } from "@equinor/eds-tokens"
import styled from "styled-components"
import Icon from "../../Icon/Icon"

const Wrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: center;
    align-items: center;
`

const Count = styled.span`
    font-size: 12px;
    padding-left: 0.5rem;
`

const Chevron = styled.span`
    cursor: pointer;
    padding-right: 1rem;
`

export const GroupCell = ({ row, cell }) => {
    return (
        <Wrapper>
            <Chevron {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <Icon name={"chevron_down"} color={tokens.colors.interactive.primary__resting.rgba} /> : <Icon name={"chevron_up"} color={tokens.colors.interactive.primary__resting.rgba} />}
            </Chevron>
            {cell.render('Cell')}
            <Count>

                ({row.subRows.length})
            </Count>
        </Wrapper>
    )
}