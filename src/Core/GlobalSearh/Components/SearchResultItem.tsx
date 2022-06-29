import { Menu } from '@equinor/eds-core-react';
import { Icon } from '@equinor/lighthouse-components';
import { KeyboardEventHandler, useState } from 'react';
import { ArrowNavigation, useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import { getHighlightedText } from '../Functions/getHiglight';
import { SearchItem, SearchResult } from '../Service/SearchApi';
import {
    Description,
    DescriptionWrapper,
    Divider,
    SearchItemWrapper,
    Title,
    VerticalMenu,
    Wrapper
} from './SearchResultItemStyles';

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
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

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
    const handleCleanup = () => {
        handleNavigationOpen(false);
        setShowMenu(false);
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
                e.preventDefault();
                e.stopPropagation();
                setShowMenu(true);
            }}
            onMouseLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setShowMenu(false);
            }}
        >
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
            <div>
                {type !== 'apps' && showMenu && (
                    <>
                        <VerticalMenu
                            ref={setAnchorEl}
                            id={`search-item-menu-${index}`}
                            aria-controls="menu-compact"
                            aria-haspopup="true"
                            aria-expanded={isNavigationOpen}
                            onFocus={() => {
                                setShowMenu(true);
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                isNavigationOpen
                                    ? handleNavigationOpen(false)
                                    : handleNavigationOpen(true);
                            }}
                        >
                            <Icon name="more_vertical" />
                        </VerticalMenu>

                        <ArrowNavigation>
                            <Menu
                                open={isNavigationOpen}
                                id="menu-default"
                                aria-labelledby={`search-item-menu-${index}`}
                                anchorEl={anchorEl}
                            >
                                <Menu.Item
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        action(id);
                                        handleCleanup();
                                    }}
                                >
                                    Open in Sidesheet
                                </Menu.Item>

                                <Menu.Item
                                    disabled={!appAction}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        appAction && appAction(id);
                                        handleCleanup();
                                    }}
                                >
                                    App with Sidesheet
                                </Menu.Item>
                            </Menu>
                        </ArrowNavigation>
                    </>
                )}
            </div>
        </Wrapper>
    );
};
6;
