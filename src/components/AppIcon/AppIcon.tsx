import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface AppIconProps {
    icon: React.FC;
    color: string;
    label?: string;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px;
    width: 84px;
    text-align: center;
`;

const IconWrapper = styled.div`
    cursor: pointer;
    border-radius: 4px;
    width: 28px;
    height: 28px;
    margin: 8px;

    :hover {
        filter: brightness(120%);
    }
`;

const IconLabel = styled.p`
    margin: 0;
`;

const AppIcon: FC<AppIconProps> = ({ icon, label }: AppIconProps): JSX.Element => {
    const navigate = useNavigate();

    function handleClick() {
        const route = `/${label}`;
        navigate(route);
    }

    const Icon = icon;
    return (
        <Wrapper onClick={() => handleClick()}>
            <IconWrapper>
                <Icon />
            </IconWrapper>
            {label && <IconLabel>{label}</IconLabel>}
        </Wrapper>
    );
};

export default AppIcon;
