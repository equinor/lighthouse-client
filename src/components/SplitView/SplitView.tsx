
/**
 *  1. Need to be able to handle tabs. Tabs should be present in every view.
 *  2. View can be slit in Horizontal and Vertical 
 *  3 view should be able to resize.
 */

import styled from "styled-components";

enum PaneType {
    Horizontal = "column",
    Vertical = "row"
}

interface Pane {
    id: number;
    type: PaneType;
    panes: Pane[]
}

interface PaneWrapperProps {
    type: PaneType;
}

const PaneWrapper = styled.div`
    display: "flex";
    flex-direction: ${({ type }: PaneWrapperProps) => type};
`

export const PaneItem = ({ type, panes }: Pane) => {
    return (
        <PaneWrapper type={type}>
            
            {panes.map((pane) => {
                <PaneItem {...pane} />
            })}
        </PaneWrapper>
    );
}

const ResizerItem = styled.div`
    height: ${({ type }: PaneWrapperProps) => type === PaneType.Vertical ? "0" : "100%"};
`

export const Resizer = ({ type }: Pane) => {
    return <ResizerItem type={type} />
}