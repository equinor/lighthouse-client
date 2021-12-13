import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Action state
interface KeyAction {
    navigateTo?: string;
    dispatch?: () => void;
    ctrlKey?: boolean;
    altKey?: boolean;
}

interface KeyActionState {
    [key: string]: KeyAction;
}

const actions: KeyActionState = {
    KeyB: {
        navigateTo: '/loop',
        ctrlKey: true,
    },
    KeyA: {
        navigateTo: '/',
        ctrlKey: true,
    },
};

export function navigationAction(to: string, history: { push: (to: string) => void }): void {
    history.push(to);
}

// Register Action

export function registerActionCode(code: string, action: KeyAction): void {
    actions[code] = action;
}

// Action Setup

export function actionSetup(history: { push: (to: string) => void }): void {
    function action(actions) {
        return (e: KeyboardEvent) => {
            const action: KeyAction | undefined = actions[e.code];
            if (!action) return;
            disabledEventPropagation(e);
            e.preventDefault();

            if (
                (action.navigateTo && action.altKey === e.altKey) ||
                (action.navigateTo && action.ctrlKey === e.ctrlKey)
            ) {
                navigationAction(action.navigateTo, history);
                return;
            }

            if (action.dispatch && action.ctrlKey === e.ctrlKey && action.altKey === e.altKey) {
                action.dispatch();
            }
            if (action.dispatch && action.ctrlKey === e.ctrlKey && action.altKey !== e.altKey) {
                action.dispatch();
            }
            if (action.dispatch && action.altKey === e.altKey && action.ctrlKey !== e.ctrlKey) {
                action.dispatch();
            }
        };
    }

    document.onkeydown = action(actions);
}

function disabledEventPropagation(e: KeyboardEvent): void {
    if (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
    }
}

// React Implementation

export function useActions(): void {
    const history = useHistory();

    useEffect(() => {
        actionSetup(history);
    }, [history]);
}
