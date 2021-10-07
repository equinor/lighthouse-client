import { useState } from 'react';
import styled from 'styled-components';
import { tree } from './TreeMoc';

export interface TreeNode {
    items: TreeNode[];
    type: 'plant' | 'system' | 'commpkg';
    title: string;
    id: string;
}

interface WrapperProps {
    selected: string;
    id: string;
}
const Tree = styled.div`
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    max-height: calc(100vh - 98px);
    overflow-y: auto;
    width: 200px;
`;

const Title = styled.div`
    margin: 0;
    padding-left: 8px;
`;

const H3 = styled.h3`
    margin: 0;
`;

const Wrapper = styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${(props: WrapperProps) => (props.id === props.selected ? '#272727' : '#666')};
`;

const HeightWrapper = styled.div`
    max-height: ${({ active }: { active: boolean }) => (active ? '1px' : '2000px')};
    overflow-y: hidden;
    transition: max-height 2s ease;
`;

const Item = styled.div`
    position: relative;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box; 
    }
        
    &:after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 100%;
        content: '';
        background-color: #666;
    }
        
    :last-child:after {
        height: 0;
    }

`;

export const TreeRoot = () => {


    return (
        <Tree>
            {tree.map((node, index) => (
                <ItemNode key={node.id + index} {...node} />
            ))}
        </Tree>
    );
};

const icon = {
    plant: 'P',
    system: 'S',
    commpkg: 'C'
};

export const ItemNode: React.FC<TreeNode> = (node: TreeNode): JSX.Element => {
    const [expand, setExpand] = useState(false);
    const [selected, setSelects] = useState("");
    const handleExpand = () => {
        setExpand((expand: boolean) => !expand);
        setSelects(node.id !== selected ? node.id : '');
    };

    return (
        <>
            <Wrapper id={node.id} selected={selected}>
                <H3>{icon[node.type]}</H3>
                <Title {...{ ...node, selected }} onClick={handleExpand}>
                    {node.title}
                </Title>
            </Wrapper>
            <HeightWrapper active={node.id !== selected}>
                {expand &&
                    node.items.map((childNode, index) => (
                        <Item key={childNode.id + index}>
                            <ItemNode {...childNode} />
                        </Item>
                    ))}
            </HeightWrapper>
        </>
    );
};
