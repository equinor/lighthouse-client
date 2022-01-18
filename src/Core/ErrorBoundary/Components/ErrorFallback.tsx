import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import LogoIcon from '../../../icons/ProX_logo';

const Page = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(30, 45, 57);
    color: #ffffff;
    object-fit: fill;
    background-image: url('/images/light-house.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
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
    right: 50px;
    top: 30%;
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

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
    routeName?: string;
}

function ErrorFallback({ error, resetErrorBoundary, routeName }: ErrorFallbackProps): JSX.Element {
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

export default ErrorFallback;
