import { useState } from 'react';

interface EdsTabHandler {
    activeTab: number;
    handleChange: (value: number) => void;
}

export function useEdsTabs(initialTabIndex?: number): EdsTabHandler {
    const [activeTab, setActiveTab] = useState(initialTabIndex ?? 0);
    const handleChange = (value: number) => setActiveTab(value);

    return {
        activeTab: activeTab,
        handleChange: handleChange,
    };
}
