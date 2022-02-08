import { Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background: ${tokens.colors.ui.background__default.rgba};
`;

export const Link = styled.a`
    padding: 1rem;
    padding-bottom: 0px;
    color: ${tokens.colors.interactive.success__resting.rgba};
`;
export const Name = styled.p`
    padding-left: 0.5rem;
`;

export const Details = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem;
    background: ${tokens.colors.ui.background__default.rgba};
`;

export const DetailGroup = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.5rem 1rem;
    background: ${tokens.colors.ui.background__default.rgba};
`;

export const DetailsLabel = styled.label`
    display: flex;
    flex-direction: row;

    background: ${tokens.colors.ui.background__default.rgba};
`;

export const UserGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1rem;
    height: 30px;
    background: ${tokens.colors.ui.background__default.rgba};
`;

export const Status = styled(Chip)`
    width: 4rem;
    text-align: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    align-content: center;
    flex-direction: row;
`;
