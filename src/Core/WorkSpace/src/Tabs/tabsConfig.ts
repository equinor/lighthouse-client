import React from 'react';
import { Analytics } from '../Icons/Analytics';
import { Gantt } from '../Icons/Gantt';
import { Garden } from '../Icons/Garden';
import { Table } from '../Icons/Table';
import { Tree } from '../Icons/Tree';
import { AnalyticsTab } from './AnalyticsTab';
import { GardenTab } from './GardenTab';
import { ListTab as TableTab } from './ListTab';
import { TimelineTab } from './TimeLineTAb';
import { TreeTab } from './TreeTab';
import { VisualEditorTab } from './VisualEditorTab';

export interface TabsConfigItem {
    title: string;
    icon: React.FC;
    viewComponent: React.FC;
}

const tabsConfig: TabsConfigItem[] = [
    {
        title: 'Tree',
        icon: Tree,
        viewComponent: TreeTab,
    },
    {
        title: 'Table',
        icon: Table,
        viewComponent: TableTab,
    },
    {
        title: 'Garden',
        icon: Garden,
        viewComponent: GardenTab,
    },
    {
        title: 'Timeline',
        icon: Gantt,
        viewComponent: TimelineTab,
    },
    {
        title: 'Analytics',
        icon: Analytics,
        viewComponent: AnalyticsTab,
    },
    {
        title: 'Editor',
        //Todo add Editor icon
        icon: Gantt,
        viewComponent: VisualEditorTab,
    },
];

interface ActiveTabs {
    tabs: TabsConfigItem[];
    viewIsActive: boolean;
}

function getTabConfig(tabsConfig: TabsConfigItem[]) {
    return function useConfiguredTabs<Config extends Record<string, unknown>>(
        tree?: Config,
        list?: Config,
        garden?: Config,
        timeline?: Config,
        analytics?: Config,
        editor?: Config
    ): ActiveTabs {
        const tabs = tabsConfig.filter((item) => {
            if (tree && item.title === 'Tree') return true;
            if (list && item.title === 'Table') return true;
            if (garden && item.title === 'Garden') return true;
            if (timeline && item.title === 'Timeline') return true;
            if (analytics && item.title === 'Analytics') return true;
            if (editor && item.title === 'Editor') return true;
            return false;
        });
        return {
            tabs,
            viewIsActive: tabs.length > 0,
        };
    };
}

export const useConfiguredTabs = getTabConfig(tabsConfig);
