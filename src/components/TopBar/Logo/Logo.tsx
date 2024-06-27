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
  function handleClick() {
    window.location.href = window.location.origin
  }

  return (
    <LogoWrapper onClick={() => handleClick()}>
      {/* <LogoIcon /> */}
      <LogoTitle>Johan Castberg</LogoTitle>
    </LogoWrapper>
  );
};

export default Logo;
