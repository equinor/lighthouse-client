import { getHighlightedText } from '../Functions/getHiglight';
import { SearchDescription } from '../Service/SearchApi';
import {
    Description,
    DescriptionWrapper,
    Divider,
    SearchItemWrapper,
    Title
} from './SearchResultItemStyles';

interface SearchContentProps {
    title: string;
    description?: string | SearchDescription[];
    searchText: string;
    shouldHighlightDescription?: boolean;
}

export function SearchContent({
    title,
    searchText,
    description,
    shouldHighlightDescription,
}: SearchContentProps): JSX.Element {
    return (
        <SearchItemWrapper>
            <Title variant="h6" title={title}>
                {getHighlightedText(title, searchText)}
            </Title>
            {description && (
                <DescriptionWrapper>
                    {typeof description === 'string' ? (
                        <Description title={description}>
                            {shouldHighlightDescription
                                ? getHighlightedText(description || '', searchText)
                                : description}
                        </Description>
                    ) : (
                        <>
                            {description.length > 0 &&
                                description.map(({ value, label }, i) => {
                                    return (
                                        <Description title={`${label} - ${value}`} key={label}>
                                            <span> {label}: </span>
                                            <b>{getHighlightedText(value || '', searchText)}</b>
                                            {i < description.length - 1 && <Divider>|</Divider>}
                                        </Description>
                                    );
                                })}
                        </>
                    )}
                </DescriptionWrapper>
            )}
        </SearchItemWrapper>
    );
}
