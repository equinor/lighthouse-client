import { useEffect, useState } from 'react';
import styled from 'styled-components';

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


type Data<T, K extends keyof T> = {
    [key: string]: {
        groupKey: K,
        value: string,
        subGroups: Data<T, K>,
        items: T[],
        count: number,
        customRenderFunction?: RenderFunction<T, K>
    }
}

interface Item {
    CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo: string;
    Id: number;
    Status__Id: string | string[];
    CheckList__TagFormularType__Tag__TagNo: string;
}



type RenderFunction<T, K extends keyof T> = (data: Data<T, K>) => React.FC<{ data: Data<T, K> }>

type CustomRender<T, K extends keyof T> = {
    [key in keyof T]: RenderFunction<T, K>;
};

function groupBy<T, K extends keyof T>(arr: T[], keys: K[], renderFunction?: CustomRender<T, K>): Data<T, K> {
    const key = keys[0] && keys[0].toString() || undefined
    if (!key) return {} as Data<T, K>;

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

    }, {} as Data<T, K>);

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
    const [data, setData] = useState<Data<Item, keyof Item>>({});
    useEffect(() => {
        async function run() {

            const response = await fetch("./data.json");
            const data: Item[] = await response.json();

            const d = data.map(item => {
                if (typeof item.Status__Id === "string")
                    item.Status__Id = [item.Status__Id, "PC"]
                return item
            })

            setData(groupBy(d, ["CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo", "Status__Id", "CheckList__TagFormularType__Tag__TagNo"]))

        };
        run()
    }, [])


    return (
        <Tree>
            {Object.keys(data).map((key: string, index: number) => (
                <ItemNode key={data[key].groupKey + index} data={data[key].subGroups} />
            ))}
        </Tree>
    );
};

const icon = {
    plant: 'P',
    system: 'S',
    commpkg: 'C'
};

export const ItemNode: React.FC<{ data: Data<Item, keyof Item> }> = ({ data }: { data: Data<Item, keyof Item> }): JSX.Element => {
    const [expand, setExpand] = useState(false);
    const [selected, setSelects] = useState("");
    const handleExpand = () => {
        setExpand((expand: boolean) => !expand);
        // setSelects(data. !== selected ? data.groupKey : '');
    };

    return (
        <>
            test
            {/* <Wrapper id={data.groupKey} selected={selected}>
                <H3>{icon[data.groupKey]}</H3>
                <Title {...{ selected }} onClick={handleExpand}>
                    {data.value}
                </Title>
            </Wrapper>
            <HeightWrapper active={data.groupKey !== selected}>
                {expand &&
                    Object.keys(data).map((key: string, index: number) => (
                        <Item key={data[key].groupeKey + index}>
                            <ItemNode {...data[key]} />
                        </Item>
                    ))}
            </HeightWrapper> */}
        </>
    );
};
