import { KeyboardEventHandler } from 'react';
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import { getHighlightedText } from '../Functions/getHiglight';
import { Description, Title, Wrapper } from './SearchResultItemStyles';

interface SearchResultItemProps {
    id: string;
    title: string;
    description?: string;
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
            selected={selected}
            onKeyDown={handleOnEnterKeyPress}
            ref={ref}
            tabIndex={tabIndex}
        >
            <Title variant="h6" title={title}>
                {getHighlightedText(title, searchText)}
            </Title>
            <Description title={description}>
                {description ? `Description: ${getHighlightedText(description, searchText)}` : ''}
            </Description>
        </Wrapper>
    );
};
