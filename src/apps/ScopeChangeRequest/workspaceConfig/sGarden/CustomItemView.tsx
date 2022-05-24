import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { CustomItemView } from '@equinor/ParkView';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { scopeChangeWorkflowStatusSortOrder } from '../dataOptions';

export const ScopechangeGardenItem = (args: CustomItemView<ScopeChangeRequest>): JSX.Element => {
    const color =
        scopeChangeWorkflowStatusSortOrder
            .readAtomValue()
            .items.find(({ name }) => name === args.data.workflowStatus)?.color ?? 'red';

    return (
        <GardenItem onClick={args.onClick} backgroundColor={color}>
            <div>{args.data.sequenceNumber}</div>
            <div></div>
        </GardenItem>
    );
};

const GardenItem = styled.div<{ backgroundColor: string }>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    width: 100%;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 0px;
    cursor: pointer;
    border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
`;
