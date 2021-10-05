import { useState } from 'react';
import styled from 'styled-components';

interface Node {
    items: Node[];
    type: 'plant' | 'system' | 'commpkg';
    title: string;
    id: string;
}

interface WrapperProps {
    selected: string;
    id: string;
}
const Tree = styled.div`
    position: absolute;
    left: 0;
    padding: 18px;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    height: calc(100vh - 98px);
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

`

export const TreeRoot = () => {
    const tree: Node[] = [
        {
            id: '1',
            title: 'plant1',
            type: 'plant',
            items: [
                {
                    id: '22',
                    title: 'system 22',
                    type: 'system',
                    items: [
                        {
                            id: '1',
                            title: 'commpkg-1',
                            type: 'commpkg',
                            items: [
                                {
                                    id: '14',
                                    title: 'commpkg-1',
                                    type: 'commpkg',
                                    items: []
                                }
                            ]
                        },
                        {
                            id: '2',
                            title: 'commpkg-2',
                            type: 'commpkg',
                            items: []
                        }
                    ]
                },
                {
                    id: '21',
                    title: 'system 21',
                    type: 'system',
                    items: [
                        {
                            id: '9',
                            title: 'commpkg-4',
                            type: 'commpkg',
                            items: []
                        },
                        {
                            id: '10',
                            title: 'commpkg-5',
                            type: 'commpkg',
                            items: []
                        },
                        {
                            id: '9',
                            title: 'commpkg-4',
                            type: 'commpkg',
                            items: []
                        },
                        {
                            id: '10',
                            title: 'commpkg-5',
                            type: 'commpkg',
                            items: [
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                }
                            ]
                        },
                        {
                            id: '9',
                            title: 'commpkg-4',
                            type: 'commpkg',
                            items: []
                        },
                        {
                            id: '10',
                            title: 'commpkg-5',
                            type: 'commpkg',
                            items: []
                        },
                        {
                            id: '9',
                            title: 'commpkg-4',
                            type: 'commpkg',
                            items: []
                        },
                        {
                            id: '10',
                            title: 'commpkg-5',
                            type: 'commpkg',
                            items: []
                        }
                    ]
                }
            ]
        },
        {
            id: '2',
            title: 'plant2',
            type: 'plant',
            items: [
                {
                    id: '24',
                    title: 'system 22',
                    type: 'system',
                    items: [
                        {
                            id: '6',
                            title: 'commpkg-1',
                            type: 'commpkg',
                            items: [
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                }
                            ]
                        },
                        {
                            id: '7',
                            title: 'commpkg-2',
                            type: 'commpkg',
                            items: []
                        }
                    ]
                }
            ]
        },
        {
            id: '3',
            title: 'plant3',
            type: 'plant',
            items: [
                {
                    id: '24',
                    title: 'system 22',
                    type: 'system',
                    items: [
                        {
                            id: '6',
                            title: 'commpkg-1',
                            type: 'commpkg',
                            items: [
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                }
                            ]
                        },
                        {
                            id: '7',
                            title: 'commpkg-2',
                            type: 'commpkg',
                            items: []
                        }
                    ]
                },
                {
                    id: '24',
                    title: 'system 22',
                    type: 'system',
                    items: [
                        {
                            id: '6',
                            title: 'commpkg-1',
                            type: 'commpkg',
                            items: [
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '9',
                                    title: 'commpkg-4',
                                    type: 'commpkg',
                                    items: []
                                },
                                {
                                    id: '10',
                                    title: 'commpkg-5',
                                    type: 'commpkg',
                                    items: []
                                }
                            ]
                        },
                        {
                            id: '7',
                            title: 'commpkg-2',
                            type: 'commpkg',
                            items: []
                        }
                    ]
                }
            ]
        }
    ];

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

export const ItemNode: React.FC<Node> = (node: Node): JSX.Element => {
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
