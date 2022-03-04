import { useCallback, useState } from 'react';
import { WorkOrder } from '../../models';

export const WorkorderSideSheet = (workorder: WorkOrder): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const fusion;
    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    const fetch = useCallback(async (id: string) => {
        const response;
    }, []);
};
