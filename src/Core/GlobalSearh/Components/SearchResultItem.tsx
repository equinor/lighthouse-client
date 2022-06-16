import { KeyboardEventHandler } from 'react';
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import { getHighlightedText } from '../Functions/getHiglight';
import { Description, Title, Wrapper } from './SearchResultItemStyles';

interface SearchResultItemProps {
    id: string;
    title: string;
    description: string;
    searchText: string;
    action: (id: string) => void;
    index: number;
}

export const SearchResultItem = ({
    id,
    action,
    title,
    description,
    searchText,
    index,
}: SearchResultItemProps): JSX.Element => {
    const {
        selected,
        focusProps: { ref, tabIndex, onClick },
    } = useArrowNavigationWithFocusState(0, index);

    function handleOnClick(): void {
        action(id);
        onClick();
    }
    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            action(id);
            onClick();
        }
    };

    return (
        <Wrapper
            onClick={handleOnClick}
            selected={selected}
            onKeyDown={handleOnKeyPress}
            ref={ref}
            tabIndex={tabIndex}
        >
            <Title variant="h6" title={title}>
                {getHighlightedText(title, searchText)}
            </Title>
            <Description title={description}>
                Description: {getHighlightedText(description, searchText)}
            </Description>
        </Wrapper>
    );
};
