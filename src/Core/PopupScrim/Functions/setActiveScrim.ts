import React from 'react';
import { getScrimContext } from '../context/scrimContext';
import { dispatch } from '../State/actions';

export function setActiveScrim(ScrimContent: React.FC): void {
    if (!ScrimContent) return;
    dispatch(getScrimContext(), () => {
        return {
            ScrimContent: ScrimContent,
        };
    });
}
