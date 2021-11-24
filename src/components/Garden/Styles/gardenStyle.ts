import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: scroll;
    align-items: flex-start;
`;
export const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`;

export const Title = styled.p`
    padding-bottom: 0.5rem;
    font-weight: 600;
    color: ${tokens.colors.text.static_icons__default.rgba};
`;

export const Groupe = styled.div`
    padding: 0.1rem;
    min-width: 200px;
    display: flex;
    align-items: center;
    position: relative;
    height: 32px;

    ::after {
        content: ' ';
        position: absolute;
        bottom: 10px;
        width: 100%;
        height: 2px;
        background-color: ${tokens.colors.ui.background__info.rgba};
    }
`;

export const Count = styled.span`
    color: ${tokens.colors.text.static_icons__default.rgba};
    font-weight: 300;
    font-size: 0.8rem;
    padding-bottom: 0.5rem;
`;

export const Pack = styled.p`
    padding: 0.5rem 1rem;
    margin: 0;
    margin-bottom: 4px;
    border: 1px solid ${tokens.colors.text.static_icons__tertiary.rgba};
    border-radius: 5px;
    color: ${tokens.colors.text.static_icons__default.rgba};
    min-width: 200px;
    cursor: pointer;

    :hover {
        opacity: 0.5;
    }
`;

export const Item = styled.p`
    padding: 0.5rem 1rem;
    margin: 0;
    margin-bottom: 4px;
    border: 1px solid ${tokens.colors.text.static_icons__tertiary.rgba};
    border-radius: 5px;
    color: ${tokens.colors.text.static_icons__default.rgba};
    min-width: 200px;
    cursor: pointer;
    background-color: white;

    :hover {
        opacity: 0.5;
    }
`;

interface DotProps {
    color: string;
}

export const Dot = styled.p`
    height: 1rem;
    width: 1rem;
    background-color: ${(p: DotProps) => p.color};
    border-radius: 50%;
`;

export const SubGroup = styled.p`
    margin-left: 10px;
    margin-bottom: 0px;
`;
