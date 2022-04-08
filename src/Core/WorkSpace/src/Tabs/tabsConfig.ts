import React from 'react';
import { Analytics } from '../Icons/Analytics';
import { Gantt } from '../Icons/Gantt';
import { Garden } from '../Icons/Garden';
import { Table } from '../Icons/Table';
import { Tree } from '../Icons/Tree';
import { WorkspaceTab } from '../WorkSpaceApi/workspaceState';
import { AnalyticsTab } from './AnalyticsTab';
import { GardenTab } from './GardenTab';
import { ListTab as TableTab } from './ListTab';
import { PowerBiTab } from './PowerBiTab';
import { TimelineTab } from './TimeLineTAb';
import { TreeTab } from './TreeTab';
import { VisualEditorTab } from './VisualEditorTab';

export interface TabsConfigItem {
    title: string;
    tabId: WorkspaceTab;
    icon: React.FC;
    viewComponent: React.FC;
}

const tabsConfig: TabsConfigItem[] = [
    {
        title: 'Tree',
        tabId: 'tree',
        icon: Tree,
        viewComponent: TreeTab,
    },
    {
        title: 'Table',
        tabId: 'table',
        icon: Table,
        viewComponent: TableTab,
    },
    {
        title: 'Garden',
        tabId: 'garden',
        icon: Garden,
        viewComponent: GardenTab,
    },
    {
        title: 'Timeline',
        tabId: 'gantt',
        icon: Gantt,
        viewComponent: TimelineTab,
    },
    {
        title: 'Analytics',
        tabId: 'analytics',
        icon: Analytics,
        viewComponent: AnalyticsTab,
    },
    {
        title: 'Editor',
        tabId: 'editor',
        //Todo add Editor icon
        icon: Gantt,
        viewComponent: VisualEditorTab,
    },
    {
        title: 'PowerBI',
        tabId: 'powerBi',
        icon: Analytics,
        viewComponent: PowerBiTab,
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
        editor?: Config,
        powerBI?: Config
    ): ActiveTabs {
        const tabs = tabsConfig.filter((item) => {
            if (tree && item.title === 'Tree') return true;
            if (list && item.title === 'Table') return true;
            if (garden && item.title === 'Garden') return true;
            if (timeline && item.title === 'Timeline') return true;
            if (analytics && item.title === 'Analytics') return true;
            if (editor && item.title === 'Editor') return true;
            if (powerBI && item.title === 'PowerBI') return true;
            return false;
        });
        return {
            tabs,
            viewIsActive: tabs.length > 0,
        };
    };
}

export const useConfiguredTabs = getTabConfig(tabsConfig);
