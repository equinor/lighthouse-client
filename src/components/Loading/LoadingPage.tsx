import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import LogoIcon from "../../icons/ProX_logo";




const Page = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(30,45,57);
    color: #ffffff;
    object-fit: fill;
    background-image: url("/images/light-house.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:linear-gradient(42deg, ${tokens.colors.ui.background__info.rgba} 0%, ${tokens.colors.ui.background__default.rgba} 100%);
    opacity: .7;
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
`
const Wrapper = styled.div`
    position: absolute;
    right: 50px;
    top: 30%;
    text-align: right;
`

const H1 = styled.h1`
    font-size: 70px;
    margin: 0;
    color: rgba(61,61,61,1);
`

const H3 = styled.h3`
    margin: 8px 0;
    font-weight: 300;
    font-size: 18x;
`


const LoadingPage = () => {
    return (
        <Page>
            <Wrapper>
                <LogoIcon width={200} height={140} />
                <H1>Johan Castberg</H1>
                <H3>Project Lighthouse Portal</H3>
            </Wrapper>
        </Page>
    );
}

export default LoadingPage;