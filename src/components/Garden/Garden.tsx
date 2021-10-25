import { tokens } from "@equinor/eds-tokens";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { createGarden, Garden } from "./Services/createGarden";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: scroll;
    align-items: flex-start;
`
const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`

const Title = styled.p`
    padding: .5rem;
    font-weight: 600;
    color: ${tokens.colors.text.static_icons__default.rgba};
    `
const Groupe = styled.div`
    padding: .1rem;
    min-width: 200px;
    display: flex;
    align-items: center;
    position: relative;

    ::after{
        content: " ";
        position: absolute;
        bottom: 10px;
        width: 100%;
        height: 2px;
        background-color: ${tokens.colors.ui.background__info.rgba};
    }
`

const Count = styled.span`
    color: ${tokens.colors.text.static_icons__default.rgba};
    font-weight: 300;
    font-size: .8rem;
`


const Pack = styled.p`
    padding: .5rem 1rem;
    margin: 0;
    margin-bottom: 4px;
    border: 1px solid ${tokens.colors.text.static_icons__tertiary.rgba};
    border-radius: 5px;
    color: ${tokens.colors.text.static_icons__default.rgba};
    min-width: 200px;
    cursor: pointer;

    :hover{
        opacity: .5;
    }
`

export function Garden<T>({ data, groupeKey, itemKey }: { data: T[] | undefined, groupeKey: keyof T, itemKey: keyof T }) {
    const [garden, setGarden] = useState<Garden<T>>()

    useEffect(() => {
        data && setGarden(createGarden(data, groupeKey))
    }, [data, groupeKey])

    return (<Wrapper>
        {garden && Object.keys(garden).map((key, index) => (
            <Col key={`col-${index}`}>
                <Groupe>
                    <Title>
                        {key}
                    </Title>
                    <Count>
                        ({garden[key].length})
                    </Count>
                </Groupe>
                {
                    garden[key].map((item, index) => <Pack key={key + index}>{item[itemKey]}</Pack>)
                }
            </Col>))}
    </Wrapper>);
}