import { tokens } from '@equinor/eds-tokens';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
            {/* <LogoIcon /> */}
            <LogoTitle>
                <span style={{ color: tokens.colors.infographic.primary__energy_red_100.rgba }}>
                    <b>Johan Castberg </b>
                </span>
                <b>Portal</b>
            </LogoTitle>
        </LogoWrapper>
    );
};

export default Logo;
