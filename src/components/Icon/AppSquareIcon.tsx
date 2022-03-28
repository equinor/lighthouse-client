import { FC } from 'react';
import styled from 'styled-components';

interface AppIconProps {
    shortName: string;
    title: string;
    color: string;
    label?: string;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const IconWrapper = styled.div`
    cursor: pointer;
    border-radius: 4px;
    background-color: ${(props) => props.color};
    width: 28px;
    height: 28px;
    margin: 8px;
    text-align: center;

    :hover {
        filter: brightness(120%);
    }
`;

const IconText = styled.p`
    font-weight: 300;
    text-transform: caps;
    font-family: Equinor;
    font-size: 10px;
    color: #ffffff;
`;
const IconLabel = styled.p`
    padding-left: 8px;
`;

const AppSquareIcon: FC<AppIconProps> = ({
    title,
    shortName,
    color,
    label,
}: AppIconProps): JSX.Element => {
    return (
        <Wrapper>
            <IconWrapper color={color} title={title}>
                <IconText>{shortName}</IconText>
            </IconWrapper>
            {label && <IconLabel>{label}</IconLabel>}
        </Wrapper>
    );
};

export default AppSquareIcon;
