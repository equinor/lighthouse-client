import { Menu } from '@equinor/eds-core-react';
import { Icon } from '@equinor/lighthouse-components';
import { KeyboardEventHandler, useRef, useState } from 'react';
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import { useNavigate } from 'react-router';
import { getHighlightedText } from '../Functions/getHiglight';
import { SearchItem, SearchResult } from '../Service/SearchApi';
import {
    Description,
    DescriptionWrapper,
    Divider,
    Title,
    VerticalMenu,
    Wrapper
} from './SearchResultItemStyles';

interface SearchResultItemProps extends SearchItem, SearchResult {
    searchText: string;
    action: (id: string) => void;
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
    const navigation = useNavigate();
    const anchorEl = useRef<HTMLDivElement>(null);

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
            <div>
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
                            {description &&
                                description.length > 0 &&
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
            </div>
            <div>
                {type !== 'apps' && appAction && showMenu ? (
                    <>
                        <VerticalMenu
                            ref={anchorEl}
                            id="search-item-menu"
                            aria-controls="menu-complex"
                            aria-haspopup="true"
                            aria-expanded={isNavigationOpen}
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
                        <Menu
                            open={isNavigationOpen}
                            id="menu-default"
                            aria-labelledby="anchor-default"
                            anchorEl={anchorEl.current}
                        >
                            <Menu.Item
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleNavigationOpen(false);
                                    action(id);
                                    setShowMenu(false);
                                }}
                            >
                                Open Sidesheet
                            </Menu.Item>
                            <Menu.Item
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleNavigationOpen(false);
                                    appAction(id, navigation);
                                    setShowMenu(false);
                                }}
                            >
                                App with Sidesheet
                            </Menu.Item>
                        </Menu>
                    </>
                ) : null}
            </div>
        </Wrapper>
    );
};
6;
