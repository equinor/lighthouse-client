import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '../../../icons/ProX_logo';

const LogoWrapper = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    cursor: pointer;
`;

const LogoTitle = styled.p`
    font-family: Equinor;
    font-style: 16px;
    line-height: 0px;
    letter-spacing: 0.2px;
    padding-left: 0.2rem;
    margin: 0;
`;

const Logo = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/');
    }

    return (
        <LogoWrapper onClick={() => handleClick()}>
            <LogoIcon />
            <LogoTitle>Johan Castberg</LogoTitle>
        </LogoWrapper>
    );
};

export default Logo;
