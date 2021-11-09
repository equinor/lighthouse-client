import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import Icon from "../../../Icon/Icon";
import { useDataViewer } from "../DataViewerApi/useDataViewer";

const Wrapper = styled.div`
    height: "-webkit-fill-available";
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`
const Heading = styled.h1`
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    margin-bottom: 0;
`;

const Info = styled.p`
    color: ${tokens.colors.interactive.warning__resting.rgba};
    font-weight: 500;
`;


export const NoDataViewer = () => {

    const { name } = useDataViewer();
    return (
        <Wrapper>
            <Icon name={"warning_outlined"} color={tokens.colors.interactive.warning__resting.rgba} size={48} />
            <Heading>No data viewer is configured!</Heading>
            <Info>{name}</Info>
        </Wrapper>
    );
}
