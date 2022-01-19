import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

/**TODO: max-heigh is hardcoded to make the garden scale correct. Expanded filter panel brakes this.
 * This needs to be removed at some point
 **/
export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: scroll;
    align-items: flex-start;
    max-height: calc(100vh - 176px);
`;
export const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
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
    cursor: pointer;

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
    margin-left: 0.8em;
    padding-bottom: 0.5rem;
`;
