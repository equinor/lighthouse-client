import { Accordion } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../../Icon/Icon';

export const AccordionHeaderTitle = styled(Link)`
    text-decoration: none;
    color: ${tokens.colors.text.static_icons__secondary.rgba};
    flex-grow: 1;
    padding-left: 1rem;
`;

const { Header, Panel } = Accordion;

export const AccordionHeader = styled(Header)`
    > svg {
        padding-right: 1rem;
    }
    /* width: 32px;
    height: 32px; */
`;

export const AccordionHeaderIcon = styled(Icon)`
    border: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    min-height: 0px;
    background-color: transparent;
    display: flex;
`;
export const AccordionPanel = styled(Panel)`
    border: 0px;
    background-color: transparent;
    min-height: 0;
`;
