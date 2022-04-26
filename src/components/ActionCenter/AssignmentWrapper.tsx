import styled from 'styled-components';
import { AssignmentsTab } from './AssignmentsTab';

export function AssignmentWrapper(): JSX.Element {
    return (
        <Wrapper>
            <AssignmentsTab />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    overflow-y: scroll;
    padding: 1em 1.5em;
`;
