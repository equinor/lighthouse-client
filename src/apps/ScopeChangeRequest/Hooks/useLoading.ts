interface UseLoading {
    Loading: () => JSX.Element | null;
}

export function useLoading(Component: JSX.Element, booleanState: boolean): UseLoading {
    return {
        Loading: () => (booleanState ? Component : null),
    };
}
