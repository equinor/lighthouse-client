import { storage } from '@equinor/Utils';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface MenuState {
    expandedMenuActive: boolean;
    menuActive: boolean;
    activeGroupe: string;
    favoritesExpanded: boolean;
}

export interface MenuContext extends MenuState {
    toggleMenu(): void;
    setExpandMenuActive(): void;
    setCompactMenuActive(): void;
    setActiveGroupe(groupId: string): void;
    setFavoritesExpanded(isExpanded: boolean);
}

const MenuContext = createContext<MenuContext>({} as MenuContext);

const initialState: MenuState = {
    expandedMenuActive: false,
    menuActive: false,
    activeGroupe: '',
    favoritesExpanded: false,
};
const MENU_KEY = 'menuState';

export const MenuProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    const [menuState, setMenuState] = useState(
        (storage.getItem<MenuState>(MENU_KEY) as MenuState) || initialState
    );

    function toggleMenu() {
        setMenuState((s) => {
            const ns = { ...s, menuActive: !s.menuActive };
            storage.setItem(MENU_KEY, ns);
            return ns;
        });
    }

    function setExpandMenuActive() {
        setMenuState((s) => {
            const ns = { ...s, expandedMenuActive: true };
            storage.setItem(MENU_KEY, ns);
            return ns;
        });
    }

    function setCompactMenuActive() {
        setMenuState((s) => {
            const ns = { ...s, expandedMenuActive: false };
            storage.setItem(MENU_KEY, ns);
            return ns;
        });
    }

    function setActiveGroupe(groupId = '') {
        setMenuState((s) => {
            const ns = { ...s, activeGroupe: groupId };
            storage.setItem(MENU_KEY, ns);
            return ns;
        });
    }

    function setFavoritesExpanded(isExpanded: boolean) {
        setMenuState((s) => {
            const ns = { ...s, favoritesExpanded: isExpanded };
            storage.setItem(MENU_KEY, ns);
            return ns;
        });
    }

    return (
        <MenuContext.Provider
            value={{
                ...menuState,
                toggleMenu,
                setExpandMenuActive,
                setCompactMenuActive,
                setActiveGroupe,
                setFavoritesExpanded,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export function useMenuContext(): MenuContext {
    return useContext(MenuContext);
}
