import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { CustomItemView } from '@equinor/ParkView';
import styled from 'styled-components';
import { getGardenColors } from './getGardenColors';
import { tokens } from '@equinor/eds-tokens';

export const ScopechangeGardenItem = (args: CustomItemView<ScopeChangeRequest>): JSX.Element => {
    const color = args.data.workflowSteps
        ? getGardenColors(args.data?.workflowSteps?.length)[
        args?.data?.workflowSteps.findIndex(({ isCurrent }) => isCurrent)
        ]
        : 'green';

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
