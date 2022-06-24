import { KeyboardEventHandler } from 'react';
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import { getHighlightedText } from '../Functions/getHiglight';
import { Description, Title, Wrapper } from './SearchResultItemStyles';

interface SearchResultItemProps {
    id: string;
    title: string;
    description?: string;
    descriptionProps?: Record<string, any>;
    descriptionComponent?: React.FC<Record<string, any> & { searchText: string }>;
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
    descriptionProps,
    descriptionComponent: DescriptionComponent,
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
            {DescriptionComponent ? (
                <Description>
                    <DescriptionComponent searchText={searchText} {...descriptionProps} />
                </Description>
            ) : (
                <Description title={description}>
                    {shouldHighlightDescription
                        ? getHighlightedText(description || '', searchText)
                        : description}
                </Description>
            )}
        </Wrapper>
    );
};
