import styled from 'styled-components';

interface WorkspaceErrorPageProps {
    children: React.ReactNode;
}

export function WorkspaceErrorPage({ children }: WorkspaceErrorPageProps): JSX.Element {
    return <CenterInAvailableSpace>{children}</CenterInAvailableSpace>;
}

const CenterInAvailableSpace = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
`;
