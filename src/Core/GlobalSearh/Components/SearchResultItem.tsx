import { KeyboardEventHandler } from 'react';
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import { getHighlightedText } from '../Functions/getHiglight';
import { SearchItem } from '../Service/SearchApi';
import { Description, DescriptionWrapper, Divider, Title, Wrapper } from './SearchResultItemStyles';

interface SearchResultItemProps extends SearchItem {
    searchText: string;
    action: (id: string) => void;
    index: number;
    shouldHighlightDescription?: boolean;
}

export const SearchResultItem = ({
    id,
    action,
    title,
    description,
    searchText,
    index,
    shouldHighlightDescription,
}: SearchResultItemProps): JSX.Element => {
    const {
        selected,
        focusProps: { ref, tabIndex, onClick },
    } = useArrowNavigationWithFocusState(0, index);

    function handleOnMouseClick(): void {
        action(id);
        onClick();
    }

    const handleOnEnterKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            action(id);
            onClick();
        }
    };

    return (
        <Wrapper
            onClick={handleOnMouseClick}
            isSelected={selected}
            onKeyDown={handleOnEnterKeyPress}
            ref={ref}
            tabIndex={tabIndex}
        >
            <Title variant="h6" title={title}>
                {getHighlightedText(title, searchText)}
            </Title>
            <DescriptionWrapper>
                {typeof description === 'string' ? (
                    <Description title={description}>
                        {shouldHighlightDescription
                            ? getHighlightedText(description || '', searchText)
                            : description}
                    </Description>
                ) : (
                    <>
                        {description?.map(({ value, label }, i) => {
                            if (!value) return <></>;
                            return (
                                <Description title={`${label} - ${value}`} key={label}>
                                    <span> {label}: </span>
                                    <b>
                                        {shouldHighlightDescription
                                            ? getHighlightedText(value || '', searchText)
                                            : description}
                                    </b>
                                    {i < description.length - 1 && <Divider>|</Divider>}
                                </Description>
                            );
                        })}
                    </>
                )}
            </DescriptionWrapper>
        </Wrapper>
    );
};
6;
