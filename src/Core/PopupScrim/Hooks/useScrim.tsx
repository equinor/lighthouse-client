import { useAtom } from '@dbeining/react-atom';
import React from 'react';
import { getScrimContext } from '../context/scrimContext';

interface ScrimComponent {
    Component?: React.FC;
}

export function useScrim(): ScrimComponent {
    const state = useAtom(getScrimContext());

    return {
        Component: state.ScrimContent,
    };
}
