import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LogoIcon from "../../../icons/ProX_logo";


const LogoWrapper = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    padding-right: 24px;
    border-right: 2px solid #EFEFEF;
`

const LogoTitle = styled.h4`
    font-family: Equinor;
    font-style:  16px;
    line-height: 24px;
    letter-spacing: 0.2px;
    padding-left: 18px;
    margin: 0;
`

const Logo = () => {
    let history = useHistory();
    function handleClick() {

        history.push("/");

    }

    return (
        <LogoWrapper onClick={() => handleClick()}>
            <LogoIcon />
            <LogoTitle>
                ProX
            </LogoTitle>
        </LogoWrapper>
    )
};

export default Logo