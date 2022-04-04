import { ScopeChangeRequest } from '../../sTypes/scopeChangeRequest';
import { Item } from '../../../../components/ParkView/Styles/item';
import styled from 'styled-components';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';

const ScopeChangeItem = styled(Item)`
    width: 100%;
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: center;
`;

const ScopeChangeExpanded = styled.div`
    display: flex;
    flex: 1;
`;

const ScopeChangeExpandedTitle = styled.div`
    display: flex;
    flex: 1;
    padding: 0 1rem;
`;

const ScopeChangeExpandedHours = styled.div`
    display: flex;
`;

export function ScopeChangeExpandedView({ data }: { data: ScopeChangeRequest }): JSX.Element {
    return (
        <ScopeChangeExpanded>
            <ScopeChangeExpandedTitle>{data.title}</ScopeChangeExpandedTitle>
            <ScopeChangeExpandedHours>
                {data.actualChangeHours > 0 ? `(${data.estimatedChangeHours}h)` : ''}
            </ScopeChangeExpandedHours>
        </ScopeChangeExpanded>
    );
}

export function ScopeChangeItemView({
    data,
    itemKey,
    onClick,
    columnExpanded,
}: CustomItemView<ScopeChangeRequest>): JSX.Element {
    return (
        <ScopeChangeItem onClick={onClick}>
            {data[itemKey]}
            {columnExpanded && <ScopeChangeExpandedView data={data} />}
        </ScopeChangeItem>
    );
}
