import { getHighlightedText } from '../Functions/getHiglight';
import { Description, Title, Wrapper } from './SearchResultItemStyles';

interface SearchResultItemProps {
    id: string;
    title: string;
    description: string;
    searchText: string;
}

export const SearchResultItem = ({
    title,
    description,
    searchText,
}: SearchResultItemProps): JSX.Element => {
    return (
        <Wrapper>
            <Title variant="h6" title={title}>
                {getHighlightedText(title, searchText)}
            </Title>
            <Description title={description}>
                Description: {getHighlightedText(description, searchText)}
            </Description>
        </Wrapper>
    );
};
