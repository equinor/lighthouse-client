import { tag } from '@equinor/eds-icons';
import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../Types/Pipetest';
import { Cable } from './Components/Cable';
import { CircuitAndStarter } from './Components/CircuitAndStarter';
import { HeatTracingCable } from './Components/HeatTracingCable';
import { JunctionBox } from './Components/JunctionBox';
import { Line } from './Components/Line';

interface ElectroNodeProps {
    tag: Tag;
    tagTree: Record<string, Tag>;
    value: string;
}

export const ElectroNode = ({ tag, tagTree, value }: ElectroNodeProps): JSX.Element => {
    const children = tag?.children;
    
    function getNodeRender(tag: Tag) {
        switch (tag?.register) {
            case 'CIRCUIT_AND_STARTER':
                return <CircuitAndStarter value={value} />;
            case 'JUNCTION_BOX':
                return <JunctionBox value={value} />;
            case 'HEAT_TRACING_CABLE':
                return (
                    <ElectroViewVericalRow>
                        <HeatTracingCable value={value} />
                        <Lines>
                            {children?.map((child) => {
                                return (
                                    <ElectroNode
                                        key={child}
                                        tag={tagTree[child]}
                                        tagTree={tagTree}
                                        value={child}
                                    />
                                );
                            })}
                        </Lines>
                    </ElectroViewVericalRow>
                );
            case 'CABLE':
                return <Cable value={value} />;
            case 'LINE':
                return <Line value={value} />;
            default:
                return null;
        }
    }

    return (
        <>
            {getNodeRender(tag)}

            {children.length === 1 ? children[0] === "LINE" ? null :
                <ElectroViewHorizontalRow>
                <ElectroNode
                key={children[0]}
                tag={tagTree[children[0]]}
                tagTree={tagTree}
                value={children[0]}
                />
                </ElectroViewHorizontalRow>
            :
            (children.length > 1) ?
                <ElectroViewVericalRow>
                {children?.map((child) => {
                    if(tagTree[child].register === "LINE") {
                        return null
                    } 
                    else {
                        return (
                            <ElectroViewHorizontalRow>
                            <ElectroNode
                                key={child}
                                tag={tagTree[child]}
                                tagTree={tagTree}
                                value={child}
                            />
                            </ElectroViewHorizontalRow>
                        );
                    }
                    
                })}
                </ElectroViewVericalRow>
            : null}
        </>
    );
};

const Lines = styled.div`
    display: flex;
    flex: 0 0 100%;
`;

const ElectroViewVericalRow = styled.div`
    display: flex;
    flex-direction: column;
`;

const ElectroViewHorizontalRow = styled.div`
    display: flex;
    flex-direction: row !important; 
    &:not(:last-child){
        margin-bottom: 20px;
    }
`;
