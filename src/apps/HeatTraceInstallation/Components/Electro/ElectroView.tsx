import React from 'react';
import styled from 'styled-components';
import { Pipetest } from '../../Types/Pipetest';
import { ElectroNode } from './ElectroNode';

interface ElectroViewProps {
    pipetest: Pipetest;
}
export const ElectroView = ({ pipetest }: ElectroViewProps): JSX.Element => {
    const tagTree = pipetest?.tagTree;
    const startNodes = tagTree['']?.children;
    const startNodesArray: string[] = startNodes[0]?.split(', ');

    return (
        <>
            {pipetest && tagTree && !!Object.keys(tagTree).length && (
                <>
                    <ElectroViewContainer>
                        <h3>Electro view</h3>
                        {startNodesArray.map((startNode) => {
                            return (
                                <ElectroViewRow key={startNode}>
                                    <ElectroNode
                                        key={startNode}
                                        tag={tagTree[startNode]}
                                        tagTree={tagTree}
                                        value={startNode}
                                    />
                                </ElectroViewRow>
                            );
                        })}
                    </ElectroViewContainer>
                </>
            )}
        </>
    );
};

const ElectroViewContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
    align-items: center;
    position: fixed;
    flex-wrap: wrap;
    overflow: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 20px;
`;

const ElectroViewRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    padding-top: 10px;
    /* flex-basis: 100% gives us a new row per circuit */
    flex-basis: 100%;
`;
