import { KeyboardEventHandler, useState } from 'react';
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import { SearchItem, SearchResult } from '../Service/SearchApi';
import { SearchContent } from './SearchResultItemContent';
import { SearchItemResultMenu } from './SearchResultItemMenu';
import { Wrapper } from './SearchResultItemStyles';

interface SearchResultItemProps extends SearchItem, SearchResult {
    searchText: string;
    action: (id: string) => void;
    appAction?: (id: string) => void;
    index: number;
    shouldHighlightDescription?: boolean;
    isNavigationOpen: boolean;
    handleNavigationOpen: (value: boolean) => void;
}

export const SearchResultItem = ({
    id,
    action,
    appAction,
    title,
    type,
    description,
    searchText,
    index,
    shouldHighlightDescription,
    isNavigationOpen,
    handleNavigationOpen,
}: SearchResultItemProps): JSX.Element => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

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
    const handleShowMenu = (val: boolean, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        setShowMenu(val);
    };

    return (
        <Wrapper
            onClick={handleOnMouseClick}
            isSelected={selected}
            onKeyDown={handleOnEnterKeyPress}
            ref={ref}
            tabIndex={tabIndex}
            onFocus={() => {
                setShowMenu(true);
            }}
            onBlur={() => {
                setShowMenu(false);
            }}
            onMouseOver={(e) => {
                handleShowMenu(true, e);
            }}
            onMouseLeave={(e) => {
                handleShowMenu(false, e);
            }}
        >
            <SearchContent
                title={title}
                description={description}
                searchText={searchText}
                shouldHighlightDescription={shouldHighlightDescription}
            />
            <SearchItemResultMenu
                id={id}
                type={type}
                index={index}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                isNavigationOpen={isNavigationOpen}
                handleNavigationOpen={handleNavigationOpen}
                action={action}
                appAction={appAction}
            />
        </Wrapper>
    );
};
