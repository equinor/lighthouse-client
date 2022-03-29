import { Accordion } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Heading = styled.h1`
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    margin-bottom: 0;
`;

export const ErrorWrapper = styled.div`
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    overflow: auto;
`;

export const HeadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AccordionWrapper = styled(Accordion)`
    width: 60%;
`;

export const RequirementsWrapper = styled.div`
    max-height: 500px;
    overflow: auto;
`;
