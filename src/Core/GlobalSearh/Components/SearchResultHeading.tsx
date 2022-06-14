import { Color, Title, Wrapper } from './SearchResultHeadingStyles';

interface SearchResultHeadingProps {
    typeTitle: string;
    color: string;
}

export const SearchResultHeading = ({
    typeTitle,
    color,
}: SearchResultHeadingProps): JSX.Element => {
    return (
        <Wrapper>
            <Color style={{ background: color }}></Color>
            <Title>{typeTitle}</Title>
        </Wrapper>
    );
};
