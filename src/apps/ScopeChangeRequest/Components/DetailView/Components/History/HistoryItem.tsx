import { DateTime } from 'luxon';
import styled from 'styled-components';
import { LogEntry } from '../../../../Types/scopeChangeRequest';

interface HistoryItemProps {
    item: LogEntry;
}

export function HistoryItem({ item }: HistoryItemProps): JSX.Element {
    return (
        <ItemWrapper>
            <MetaText>
                {`${DateTime.fromJSDate(new Date(item.createdAtUtc)).toRelative()} by ${item.createdBy.firstName
                    } ${item.createdBy.lastName}`}
            </MetaText>
            <Text>{item.description}</Text>
        </ItemWrapper>
    );
}

const ItemWrapper = styled.div`
    padding: 0.5em 0em;
`;

const MetaText = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 10px;
`;

const Text = styled.div`
    font-size: 16px;
`;
