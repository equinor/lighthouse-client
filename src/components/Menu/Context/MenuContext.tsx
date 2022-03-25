import { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface MenuState {
    expandedMenuActive: boolean;
    menuActive: boolean;
    activeGroupe: string;
}

export interface MenuContext extends MenuState {
    toggleMenu(): void;
    setExpandMenuActive(): void;
    setCompactMenuActive(): void;
    setActiveGroupe(groupId: string): void;
}

const MenuContext = createContext<MenuContext>({} as MenuContext);

const initialState: MenuState = { expandedMenuActive: false, menuActive: false, activeGroupe: '' };

export const MenuProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    const [state, setState] = useState(initialState);

    function toggleMenu() {
        setState((s) => ({ ...s, menuActive: !s.menuActive }));
    }

    function setExpandMenuActive() {
        setState((s) => ({ ...s, expandedMenuActive: true }));
    }

    function setCompactMenuActive() {
        setState((s) => ({ ...s, expandedMenuActive: false }));
    }

    function setActiveGroupe(groupId = '') {
        setState((s) => ({ ...s, activeGroupe: groupId }));
    }

    return (
        <MenuContext.Provider
            value={{
                ...state,
                toggleMenu,
                setExpandMenuActive,
                setCompactMenuActive,
                setActiveGroupe,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export function useMenuContext(): MenuContext {
    return useContext(MenuContext);
}
