import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

/**
 * A React Context that doesn't re-render all children when state changes.
 * Uses refs to handle state.
 * Returns a React Provider component and a useStore hook to access and modify the context's data.
 */
export const createRefContext = <Store extends Record<PropertyKey, unknown>>(
    initialState: Store
) => {
    const useStoreData = () => {
        const store = useRef(initialState);

        const get = useCallback(() => store.current, []);

        const subscribers = useRef(new Set<() => void>());

        const set = useCallback((value: Partial<Store>) => {
            store.current = { ...store.current, ...value };
            subscribers.current.forEach((callback) => callback());
        }, []);

        const subscribe = useCallback((callback: () => void) => {
            subscribers.current.add(callback);
            return () => subscribers.current.delete(callback);
        }, []);

        return {
            get,
            set,
            subscribe,
        };
    };

    const StoreContext = createContext<ReturnType<typeof useStoreData> | null>(null);

    const Provider = ({ children }: { children: ReactNode }): JSX.Element => {
        return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
    };

    const useStore = <T extends unknown>(
        selector: (store: Store) => T
    ): [T, (value: Partial<Store>) => void] => {
        const store = useContext(StoreContext);

        if (!store) {
            throw new Error('Store not found');
        }

        const [state, setState] = useState(selector(store.get()));

        useEffect(() => {
            const unsub = store.subscribe(() => setState(selector(store.get())));
            return () => {
                unsub();
            };
        }, []);

        return [state, store.set];
    };

    return { Provider, useStore };
};
