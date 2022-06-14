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
            <Color color={color}></Color>
            <Title variant="h5">{typeTitle}</Title>
        </Wrapper>
    );
};
