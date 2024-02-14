import { Progress } from '@equinor/eds-core-react-old';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const Loading = (): JSX.Element => {
    return (
        <LoadingContainer>
            <Progress.Circular />
            Loading...
        </LoadingContainer>
    );
};
