import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    cursor: pointer;
`;

const LogoTitle = styled.div`
    font-family: Equinor;
    font-size: 16px;
    line-height: 0px;
    font-weight: 500;
    letter-spacing: 0.2px;
    margin: 0;
`;

const Logo = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/');
    }

    return (
        <LogoWrapper onClick={() => handleClick()}>
            {/* <LogoIcon /> */}
            <LogoTitle>Johan Castberg</LogoTitle>
        </LogoWrapper>
    );
};

export default Logo;
