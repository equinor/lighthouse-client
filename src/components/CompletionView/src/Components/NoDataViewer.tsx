import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import Icon from "../../../Icon/Icon";
import { useDataViewer } from "../DataViewerApi/useDataViewer";

const Wrapper = styled.div`
    margin-top: 100px;
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

const Iframe = styled.iframe`
    background-color: ${tokens.colors.ui.background__medium.rgba};
    border: none;
    border-radius: 5px;
    width: 50%;   
    height: 500px;
`;




export const NoDataViewer = () => {
    const { name } = useDataViewer();
    return (
        <Wrapper>
            <Icon name={"warning_outlined"} color={tokens.colors.interactive.warning__resting.rgba} size={48} />
            <Heading>No data viewer is configured!</Heading>
            <Info>{name}</Info>

            <Iframe
                src="./dataView.md"
            ></Iframe>
        </Wrapper >
    );
}
