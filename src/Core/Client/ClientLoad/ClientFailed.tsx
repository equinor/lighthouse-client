import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Fullscreen } from './client.styles';

interface ClientFailedProps {
    error: string;
}

export const ClientFailed = ({ error }: ClientFailedProps): JSX.Element => {
    if (typeof error !== 'string') {
        error = 'Unknown error';
    }
    return (
        <Fullscreen>
            <Icon
                name={'warning_outlined'}
                color={tokens.colors.interactive.warning__resting.rgba}
                size={48}
            />
            <ErrorMessage>
                <h1>Portal failed to load</h1>
                <div>{error}</div>
            </ErrorMessage>
        </Fullscreen>
    );
};

const ErrorMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
