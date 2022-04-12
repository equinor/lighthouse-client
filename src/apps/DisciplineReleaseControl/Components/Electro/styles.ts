import styled from 'styled-components';

export const ElectroViewContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    overflow: auto;
    white-space: nowrap;
    padding: 20px;
    max-width: 1500px;
    width: 100%;
    max-height: 800px;
    overflow-x: auto;
    overflow-y: auto;
`;

export const SwitchBoardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    white-space: nowrap;
    padding: 20px;
    max-width: 1500px;
    width: 100%;
    border-left: 1px solid #dcdcdc;
    margin-bottom: 50px;
`;

export const ElectroViewRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    padding-top: 10px;
    /* flex-basis: 100% gives us a new row per circuit */
    flex-basis: 100%;
`;

export const ElectroViewNodeGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ElectroViewNodeText = styled.div`
    font-size: 12px;
    font-weight: 500, Medium;
    margin-left: 5px;
`;

export const ElectroViewNodeValueText = styled.div`
    font-size: 16px;
    font-weight: 400, regular;
    margin-left: 4px;
    cursor: default;
`;
