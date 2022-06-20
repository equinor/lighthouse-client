import styled from 'styled-components';
import { useWorkSpace } from '@equinor/WorkSpace';
import { Pipetest } from '../../../Types/pipetest';
import { tokens } from '@equinor/eds-tokens';

interface LineProps {
    value?: string;
    currentPipetest: boolean;
    pipetest: Pipetest | undefined;
    htCable?: string;
}

export const Line = ({ value, currentPipetest, pipetest, htCable }: LineProps): JSX.Element => {
    const { onSelect } = useWorkSpace();
    return (
        <LineNode
            currentPipetest={currentPipetest}
            htCable={htCable}
            onClick={() => onSelect && onSelect(pipetest)}
        >
            {value}
        </LineNode>
    );
};

const LineNode = styled.div<{ currentPipetest: boolean; htCable: string | undefined }>`
    flex: 0 0 86px;
    height: 10px;
    border-radius: 10px;
    padding: 7px;
    text-align: center;
    background: ${(p) =>
        p.currentPipetest && !p.htCable
            ? tokens.colors.interactive.primary__resting.hex
            : tokens.colors.ui.background__light.hex};
    color: ${(p) =>
        p.currentPipetest && !p.htCable
            ? tokens.colors.ui.background__light.hex
            : tokens.colors.text.static_icons__default.hex};
    cursor: pointer;
    margin-left: 5px;
    margin-top: 4px;
    font-size: 14px;
`;
