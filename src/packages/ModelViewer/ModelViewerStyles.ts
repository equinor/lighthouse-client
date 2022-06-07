import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    > div {
        display: none;
    }
`;

export const WrapperMenu = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 50px;
    width: 100%;
`;

export const Selections = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    top: 50px;
    left: 50px;
`;

export const Menu = styled.div`
    display: flex;
    bottom: 50px;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 50px;
    > button {
        margin: 0rem 0.25rem;
    }
`;

export const MessageWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 100%;
    top: 0px;
    height: 100%;
`;

export const Message = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0.5rem;
`;
