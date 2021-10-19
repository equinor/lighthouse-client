import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

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

export const Garden = ({ garden }) => {
    return (<Wrapper>
        {Object.keys(garden).map((key, index) => (
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
                    garden[key].map((item, index) => <Pack key={key + index}>{item["CheckList__TagFormularType__Tag__TagNo"]}</Pack>)
                }
            </Col>))}
    </Wrapper>);
}