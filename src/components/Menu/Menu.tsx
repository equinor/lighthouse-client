import { PropsWithChildren } from 'react';
import { CompactMenu } from './Components/CompactMenu/CompactMenu';
import { ExpandedMenu } from './Components/ExpandedMenu/ExpandedMenu';
import { FavoritesProvider } from './Context/FavoritesContext';
import { useMenuContext } from './Context/MenuContext';
import { ChildrenWrapper, MainMenuWrapper, Wrapper } from './MenuStyles';

export const Menu = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    const { expandedMenuActive, menuActive } = useMenuContext();

    return (
        <FavoritesProvider>
            <Wrapper>
                {menuActive && (
                    <div>
                        {expandedMenuActive ? (
                            <ExpandedMenu />
                        ) : (
                            <MainMenuWrapper>
                                <CompactMenu />
                            </MainMenuWrapper>
                        )}
                    </div>
                )}
                <ChildrenWrapper>{children}</ChildrenWrapper>
            </Wrapper>
        </FavoritesProvider>
    );
};
