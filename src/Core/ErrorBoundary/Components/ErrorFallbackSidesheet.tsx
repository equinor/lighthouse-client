import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import LogoIcon from '../../../icons/ProX_logo';

const Page = styled.div`
    height: 100vh;
    width: 100vw;
    background: #ffffff;
    color: #ffffff;
    object-fit: fill;
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
            42deg,
            ${tokens.colors.ui.background__info.rgba} 0%,
            ${tokens.colors.ui.background__default.rgba} 100%
        );
        opacity: 0.7;
    }

    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        70% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
`;
const Wrapper = styled.div`
    position: absolute;
    padding: 1rem;
    top: 10%;
    margin-right: 1rem;
    text-align: right;
`;

const H1 = styled.h1`
    font-size: 70px;
    margin: 0;
    color: rgba(61, 61, 61, 1);
`;

const H3 = styled.h3`
    margin: 8px 0;
    font-weight: 300;
    font-size: 18x;
    padding: 2rem;
`;

const ErrorBox = styled.div`
    background-color: rgba(61, 61, 61, 1);
    text-align: left;
    position: absolute;
    margin-top: 2.5rem;
`;

interface ErrorFallbackSidesheetProps {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
    routeName?: string;
}

function ErrorFallbackSidesheet({
    error,
    resetErrorBoundary,
    routeName,
}: ErrorFallbackSidesheetProps): JSX.Element {
    return (
        <Page>
            <Wrapper>
                <LogoIcon width={200} height={140} />
                <H1>Something went wrong{routeName ? ' in the component ' + routeName : null}:</H1>
                <ErrorBox>
                    <H3>{error.message}</H3>
                </ErrorBox>
                <Button onClick={resetErrorBoundary}>Try again</Button>
            </Wrapper>
        </Page>
    );
}

export default ErrorFallbackSidesheet;
