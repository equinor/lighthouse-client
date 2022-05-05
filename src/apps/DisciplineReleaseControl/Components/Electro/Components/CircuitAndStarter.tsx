import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ElectroViewNodeGroup, ElectroViewNodeValueText } from '../styles';
import { TestDot } from './TestDot';

interface CircuitAndStarterProps {
    value?: string;
    cTestStatus: string;
}
export const CircuitAndStarter = ({ value, cTestStatus }: CircuitAndStarterProps): JSX.Element => {
    return (
        <ElectroViewNodeGroup>
            <CircuitAndStarterNode>
                <TestDot value="C" status={cTestStatus} />
                <ElectroViewNodeValueText>
                    <div title={value}>{value?.slice(value.length - 3, value.length)}</div>
                </ElectroViewNodeValueText>
                <Icon
                    size={16}
                    style={{ transform: 'rotate(90deg)' }}
                    color={tokens.colors.text.static_icons__default.hex}
                    name="circuit"
                />
            </CircuitAndStarterNode>
        </ElectroViewNodeGroup>
    );
};

const CircuitAndStarterNode = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    margin-top: 16px;
    justify-content: center;
    max-height: 40px;
    width: 84px;
    background: ${tokens.colors.ui.background__default.hex};
`;
