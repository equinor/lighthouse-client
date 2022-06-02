import { useEffect } from 'react';
import { agStyles } from '../styles/styles';

export const useAgGridStyles = (): void => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = agStyles;
        style.id = 'ag-grid-styles';
        document.head.append(style);
        return () => style.remove();
    }, []);
};

export default useAgGridStyles;
