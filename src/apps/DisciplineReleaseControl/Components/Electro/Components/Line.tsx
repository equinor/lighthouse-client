import { deref } from '@dbeining/react-atom';
import React from 'react';
import styled from 'styled-components';
import { CoreContext } from '../../../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { useLocationKey } from '../../../../../packages/Filter/Hooks/useLocationKey';
import { Pipetest } from '../../../Types/pipetest';

interface LineProps {
    value?: string;
    currentPipetest: boolean;
    pipetest: Pipetest | undefined;
}
export const Line = ({ value, currentPipetest, pipetest }: LineProps): JSX.Element => {
    const locationKey = useLocationKey();
    const { onSelect } = deref(CoreContext)[locationKey];
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
