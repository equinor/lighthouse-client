import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { CustomHeaderView } from '../../../../components/ParkView/Models/gardenOptions';
import { Pipetest } from '../../Types/pipetest';
export const Title = styled.p`
    font-weight: 700;
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__default.rgba};
    margin-left: 5px;
`;

export const Groupe = styled.div`
    padding: 0.1rem;
    width: 96%;
    display: flex;
    align-items: center;
    position: relative;
    height: 30px;
    border: 1px solid black;
    border-radius: 4px;
    cursor: pointer;
`;

export const Count = styled.span`
    color: ${tokens.colors.text.static_icons__default.rgba};
    font-weight: 300;
    font-size: 0.8rem;
    margin-left: 0.8em;
`;
export const ReleaseControlGardenHeader = (props: CustomHeaderView<Pipetest>) => {
    const { columnIndex, garden } = props;
    return (
        <Groupe>
            {garden[columnIndex].status?.statusElement}
            <Title>{garden[columnIndex].value}</Title>
            <Count>({garden[columnIndex].count})</Count>
        </Groupe>
    );
};
