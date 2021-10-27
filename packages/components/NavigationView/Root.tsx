import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../src/components/Icon/Icon';

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
    padding: 1rem;
`;

interface TitleProps {
    isSelected: boolean;

}
const Title = styled.h5`
    margin: 0;
    padding: 0.2rem;
    width: -webkit-fill-available;
    margin-bottom: 0.1rem;
    border-radius: 10%;
    background-color: ${tokens.colors.ui.background__light.rgba};
`;

const H3 = styled.h3`
    margin: 0;
`;

const Wrapper = styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    /* color: ${(props: WrapperProps) => (props.id === props.selected ? '#9aee2c' : '#272727')}; */

    svg{
        height: 16px;
        width: 16px;
    }
`;

const HeightWrapper = styled.div`
    max-height: ${({ active }: { active: boolean }) => (active ? '1px' : '2000px')};
    overflow-y: hidden;
    transition: max-height 2s ease;
    padding-left: 0.5rem;
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


type Data<T> = {
    [key: string]: DataSet<T>
}

type DataSet<T> = {
    groupKey: keyof T,
    value: string,
    subGroups: Data<T>,
    items: T[],
    count: number,
    customRenderFunction?: RenderFunction<T>
}

interface Item {
    CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo: string;
    Id: number;
    Status__Id: string | string[];
    CheckList__TagFormularType__Tag__TagNo: string;
    CheckList__TagFormularType__Tag__Project__Name: string;
    CheckList__TagFormularType__FormularType__Discipline__Id: string;
    CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPhase__Id: string;
}



type RenderFunction<T> = (data: Data<T>) => React.FC<{ data: Data<T> }>

type CustomRender<T,> = {
    [key in keyof T]: RenderFunction<T>;
};

function groupBy<T, K extends keyof T>(arr: T[], keys: K[], renderFunction?: CustomRender<T>): Data<T> {

    const key = keys[0] && keys[0].toString() || undefined
    if (!key) return {} as Data<T>;

    const data = arr.reduce((acc, item) => {
        const itemKeys: [] = Array.isArray(item[key]) ? item[key] : [item[key]];

        itemKeys.forEach((valueKey: string) => {

            acc[valueKey] = acc[valueKey] || {
                groupKey: key,
                value: valueKey,
                subGroups: {},
                items: [],
                count: 0,
                renderFunction: renderFunction && renderFunction[key]
            };
            acc[valueKey].items.push(item)
            acc[valueKey].count = acc[valueKey].count + 1
        });
        return acc

    }, {} as Data<T>);

    if (keys.length === 0) return data;

    const nextKeys = keys.slice(1)
    Object.keys(data).forEach(key => {
        data[key].subGroups = groupBy(data[key].items, nextKeys);
        if (nextKeys.length > 0)
            data[key].items = [];
    });

    return data

}

export const TreeRoot = () => {
    const [data, setData] = useState<Data<Item>>({});
    useEffect(() => {
        async function run() {

            const response = await fetch("./data.json");
            const data: Item[] = await response.json();

            const d = data.map(item => {
                if (typeof item.Status__Id === "string")
                    item.Status__Id = [item.Status__Id, "PC"]
                return item
            })

            setData(groupBy(d, ["Status__Id", "CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPhase__Id", "CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo"]))

        };
        run()
    }, [])


    return (
        <Tree>
            {Object.keys(data).map((key: string, index: number) => (
                <ItemNode key={data[key].groupKey + index} data={data[key]} />
            ))}
        </Tree>
    );
};

const icon = {
    plant: 'P',
    system: 'S',
    commpkg: 'C'
};

export function ItemNode<T>({ data }: { data: DataSet<T> }): JSX.Element {
    const [expand, setExpand] = useState(false);
    const [selected, setSelects] = useState<string>("");
    const handleExpand = () => {
        setExpand((expand: boolean) => !expand);
        setSelects(data.groupKey.toString() !== selected ? data.groupKey.toString() : '');
    };

    return (
        <>

            <Wrapper id={data.groupKey.toString()} selected={selected} onClick={handleExpand}>
                {/* <H3>{icon[data.groupKey.toString()]}</H3> */}
                {
                    Object.keys(data.subGroups).length > 0 &&
                    <Icon name={data.groupKey.toString() === selected ? "remove_outlined" : "add_circle_outlined"} />
                }
                <Title {...{ selected }} >
                    {data.value}
                </Title>
            </Wrapper>
            <HeightWrapper active={data.groupKey !== selected}>
                {expand &&
                    Object.keys(data.subGroups).map((key: string, index: number) => (
                        <Item key={data.subGroups[key].groupKey.toString() + index}>

                            <ItemNode data={data.subGroups[key]} />
                        </Item>
                    ))}
            </HeightWrapper>
        </>
    );
};
