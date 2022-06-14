import { Description, Title, Wrapper } from './SearchResultItemStyles';

interface SearchResultItemProps {
    title: string;
    description: string;
}

export const SearchResultItem = ({ title, description }: SearchResultItemProps): JSX.Element => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Wrapper>
    );
};
