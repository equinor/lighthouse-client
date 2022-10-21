import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { releaseControlQueries } from '../../../../queries/queries';
import { Wrapper, WrapperFillerDiv } from '../sidesheetStyles';

export const HistoryTab = (): JSX.Element => {
    const id = useReleaseControlContext(({ releaseControl }) => releaseControl.id);
    const { data: history } = useQuery(releaseControlQueries.historyQuery(id));

    return (
        <Wrapper>
            <List>{history && history.map(({ id, title }) => <div key={id}>{title}</div>)}</List>
            <WrapperFillerDiv />
        </Wrapper>
    );
};

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;
