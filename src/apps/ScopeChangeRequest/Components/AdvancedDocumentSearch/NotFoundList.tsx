import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface NotFoundListProps {
    type: string | undefined;
    notFound: string[];
}
export function NotFoundList({ notFound, type }: NotFoundListProps): JSX.Element | null {
    if (notFound.length === 0 || !type) {
        return null;
    }

    return (
        <ErrorContainer>
            <div>
                {notFound.length} {`${type}s`} were not found:
            </div>
            <ErrorDetails>
                {notFound.map((s) => (
                    <div key={s}>{s}</div>
                ))}
            </ErrorDetails>
        </ErrorContainer>
    );
}

export const ErrorDetails = styled.div`
    flex-direction: column;
    gap: 0em;
    display: flex;
    text-align: left;
    width: 100%;
`;

export const ErrorContainer = styled.div`
    min-width: 250px;
    min-height: 15px;
    width: -webkit-fill-available;
    height: auto;
    border-radius: 5px;
    background-color: ${tokens.colors.ui.background__danger.hex};
    display: flex;
    padding: 0.5em 0.5em;
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 0.7em;
`;
