import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    align-items: flex-start;
`
const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`

const P = styled.p`
    padding: .5rem;
    background-color: ${tokens.colors.ui.background__medium.rgba};
    color: ${tokens.colors.text.static_icons__default.rgba};
    width: 100px;
`

const Pack = styled.p`
    padding: .5rem 1rem;
    margin: 0;
    margin-bottom: 4px;
    background-color: #666;
    color: #fff;
    width: 100px;
    cursor: pointer;

    :hover{
        opacity: .5;
    }
`

export const Garden = ({ garden }) => {
    return (<Wrapper>
        {Object.keys(garden).map((key, index) => (
            <Col key={`col-${index}`}>
                <P>{key}</P>
                {
                    garden[key].map((item, index) => <Pack key={key + index}>{item["CheckList__TagFormularType__Tag__TagNo"]}</Pack>)
                }
            </Col>))}
    </Wrapper>);
}