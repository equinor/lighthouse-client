import React from 'react';
import styled from 'styled-components';
import { useWorkSpace } from '@equinor/WorkSpace';
import { Pipetest } from '../../../Types/pipetest';

interface LineProps {
    value?: string;
    currentPipetest: boolean;
    pipetest: Pipetest | undefined;
}

export const Line = ({ value, currentPipetest, pipetest }: LineProps): JSX.Element => {
    const { onSelect } = useWorkSpace();
    return (
        <LineNode currentPipetest={currentPipetest} onClick={() => onSelect && onSelect(pipetest)}>
            {value}
        </LineNode>
    );
};

const LineNode = styled.div<{ currentPipetest: boolean }>`
    flex: 0 0 86px;
    height: 10px;
    border-radius: 10px;
    padding: 7px;
    text-align: center;
    background: ${(p) => (p.currentPipetest ? '#007079' : '#f7f7f7')};
    color: ${(p) => (p.currentPipetest ? '#f7f7f7' : '#000000')};
    cursor: pointer;
    margin-left: 5px;
`;
