import { HeaderWrapper, LeftSection, Title } from './HeaderStyles';

interface HeaderProps {
    name: string;
}

export const Header = ({ name }: HeaderProps): JSX.Element => {
    return (
        <HeaderWrapper>
            <LeftSection>
                <Title variant="h3">{name}</Title>
            </LeftSection>
        </HeaderWrapper>
    );
};
