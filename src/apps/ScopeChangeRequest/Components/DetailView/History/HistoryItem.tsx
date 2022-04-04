import styled from 'styled-components';
import { LogEntry } from '../../../sTypes/scopeChangeRequest';
import { dateToDateTimeFormat } from '../../Workflow/Utils/dateFormatting';

interface HistoryItemProps {
    item: LogEntry;
}

export function HistoryItem({ item }: HistoryItemProps): JSX.Element {
    const formattedDate = dateToDateTimeFormat(new Date(item.createdAtUtc));

    return (
        <ItemWrapper>
            <MetaText>
                {`${formattedDate} by ${item.createdBy.firstName} ${item.createdBy.lastName}`}
            </MetaText>
            <Text>{item.title.length > 0 ? item.title : item.details}</Text>
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
