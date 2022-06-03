import styled from 'styled-components';
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';

export const HelpPageTab = (): JSX.Element | null => {
    const { helpPageOptions } = useWorkSpace();

    if (!helpPageOptions) return null;
    const { Component } = helpPageOptions;
    return (
        <HelpPageWrapper>
            <Component />
        </HelpPageWrapper>
    );
};

const HelpPageWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: left;
    height: 100%;
    padding: 20px;
    width: 100%;
`;
