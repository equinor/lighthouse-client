// Factory Types

import { useAtom } from '@dbeining/react-atom';
import { Menu, Scrim } from '@equinor/eds-core-react';
import { Atom, deref, swap } from '@libre/atom';
import { useEffect, useMemo, useState } from 'react';

interface Factory {
    factoryId: string;
    tile: string;
    icon?: React.FC;
    component: React.FC<unknown>;
}

interface DataFactoryState {
    isActiveFactory?: Factory;
    factoryScope?: Record<string, unknown>;
    factories: {
        [key: string]: Factory;
    };
}
// Factory State

export function createGlobalFactoryState(defaultState: DataFactoryState): Atom<DataFactoryState> {
    return Atom.of(defaultState);
}

export const FactoryCoreContext = createGlobalFactoryState({
    factories: {},
});

export function getFactoryContext(): Atom<DataFactoryState> {
    return FactoryCoreContext;
}

// Factory Core Actions

export function dispatch(
    globalState: Atom<DataFactoryState>,
    update: (state: DataFactoryState) => DataFactoryState
): void {
    swap(globalState, update);
}

export function readState<S>(
    globalState: Atom<DataFactoryState>,
    read: (state: DataFactoryState) => S
): S {
    const state = deref<DataFactoryState>(globalState);
    return read(state);
}

// Factory Get / Hook

export function getFactoryByFactoryId(factoryId: string): Factory | undefined {
    return readState(getFactoryContext(), (state) => state.factories[factoryId]);
}
export function getAllFactories(): Factory[] {
    return Object.values(readState(getFactoryContext(), (state) => state.factories)) || [];
}

export function getFactoriesByFactoryIds(factoryIds: string[]): Factory[] {
    const factories: Factory[] = [];
    factoryIds.forEach((factoryId) => {
        const factory = getFactoryByFactoryId(factoryId);
        if (factory) {
            factories.push(factory);
        }
    });
    return factories;
}

interface Factories {
    factories: Factory[];
    activeFactory?: Factory;
    scope?: Record<string, unknown>;
}

export function useFactories(factoryIds?: string[]): Factories {
    const state = useAtom(getFactoryContext());
    const [factories, setFactories] = useState<Factory[]>(Object.values(state) || []);

    useEffect(() => {
        if (!factoryIds) {
            setFactories(Object.values(state.factories));
            return;
        }
        const factories: Factory[] = [];
        factoryIds.forEach((factoryId) => {
            const factory = getFactoryByFactoryId(factoryId);
            if (factory) {
                factories.push(factory);
            }
        });
        setFactories(factories);
    }, [factoryIds, state.factories]);

    return { factories, activeFactory: state.isActiveFactory, scope: state.factoryScope };
}

// Factory Api

export function createDataFactory(factory: Factory): void {
    dispatch(getFactoryContext(), (state: DataFactoryState) => {
        if (state.factories[factory.factoryId]) {
            // eslint-disable-next-line no-console
            console.warn('Factory already is Registered!');
        }
        const factories = state.factories;
        factories[factory.factoryId] = {
            ...factory,
        };

        return {
            ...state,
            factories,
        };
    });
}

export function setActiveFactoryById(factoryId?: string, scope?: Record<string, unknown>): void {
    if (!factoryId) return;
    dispatch(getFactoryContext(), (state: DataFactoryState) => {
        const isActiveFactory = state.factories[factoryId];
        return {
            ...state,
            isActiveFactory,
            factoryScope: scope,
        };
    });
}

export function clearComponent(): void {
    dispatch(getFactoryContext(), (state: DataFactoryState) => {
        return {
            ...state,
            isActiveFactory: undefined,
            factoryScope: undefined,
        };
    });
}
// Hooks

export function useFactory(
    factoryId?: string,
    scope?: Record<string, unknown>
): { onClick(): void } {
    const onClick = useMemo(
        () => () => {
            setActiveFactoryById(factoryId, scope);
        },
        [factoryId, scope]
    );
    return {
        onClick,
    };
}

// Components

interface AddButtonProps {
    factory?: Factory;
    scope?: Record<string, unknown>;
}

export function AddButton({ factory, scope }: AddButtonProps): JSX.Element {
    const { onClick } = useFactory(factory?.factoryId, scope);
    return <button onClick={onClick}>+</button>;
}

// Menue

interface AddMenuProps {
    isOpen: boolean;
    factoryId?: string[];
    anchorEl?: HTMLElement | null | undefined;
    scope?: Record<string, unknown>;
    handleClose?: () => void;
    onMouseEnter?: () => void;
}

export function AddMenu({
    factoryId,
    anchorEl,
    isOpen,
    scope,
    handleClose,
    onMouseEnter,
}: AddMenuProps): JSX.Element | null {
    const { factories } = useFactories(factoryId);
    if (!isOpen) return null;
    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onMouseLeave={handleClose}
            onMouseEnter={onMouseEnter}
        >
            {factories.map((factory) => (
                <AddMenuButton key={factory.factoryId} factory={factory} scope={scope} />
            ))}
        </Menu>
    );
}

export function AddMenuButton({ factory, scope }: AddButtonProps): JSX.Element {
    const { onClick } = useFactory(factory?.factoryId, scope);
    return <Menu.Item onClick={onClick}>{factory?.tile}</Menu.Item>;
}

// Scrim

interface FactoryComponentProps {
    isDismissable?: boolean;
    onClose?: () => void;
}

export function FactoryComponent({ onClose }: FactoryComponentProps): JSX.Element {
    const { activeFactory, scope } = useFactories();
    const Component = activeFactory?.component;
    return (
        <>
            {Component && (
                <Scrim
                    onClose={() => {
                        clearComponent();
                        onClose && onClose();
                    }}
                    isDismissable={true}
                >
                    <div
                        style={{
                            height: 500,
                            width: 1000,
                            background: '#ffffff',
                            display: 'flex',
                        }}
                    >
                        <Component {...scope} />
                    </div>
                </Scrim>
            )}
        </>
    );
}
