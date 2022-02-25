import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { CustomHeaderView } from '../../../../components/ParkView/Models/gardenOptions';
import { HandoverPackage } from '../models';
export const Title = styled.p`
    padding-bottom: 0.5rem;
    font-weight: 400;
    color: ${tokens.colors.text.static_icons__default.rgba};
`;

export const Groupe = styled.div`
    padding: 0.1rem;
    min-width: 200px;
    display: flex;
    align-items: center;
    position: relative;
    height: 32px;
    cursor: pointer;

    ::after {
        content: ' ';
        position: absolute;
        bottom: 10px;
        width: 100%;
        height: 2px;
        background-color: ${tokens.colors.ui.background__info.rgba};
    }
`;

export const Count = styled.span`
    color: ${tokens.colors.text.static_icons__default.rgba};
    font-weight: 300;
    font-size: 0.8rem;
    margin-left: 0.8em;
    padding-bottom: 0.5rem;
`;
export const HandoverGardenHeader = (props: CustomHeaderView<HandoverPackage>) => {
    const { columnKey, garden } = props;
    return (
        <Groupe>
            {garden[columnKey].status?.statusElement}
            <Title>{garden[columnKey].value}</Title>
            <Count>({garden[columnKey].count})</Count>
        </Groupe>
    );
};
