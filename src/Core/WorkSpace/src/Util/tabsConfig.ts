import React from 'react';
import { Analytics } from '../Icons/Analytics';
import { Gantt } from '../Icons/Gantt';
import { Garden } from '../Icons/Garden';
import { HelpPageIcon } from '../Icons/Help';
import { Table } from '../Icons/Table';
import { Tree } from '../Icons/Tree';
import { GardenTab } from '../Tabs/GardenTab';
import { HelpPageTab } from '../Tabs/HelpPageTab';
import { ListTab as TableTab } from '../Tabs/ListTab';
import { PowerBiTab } from '../Tabs/PowerBiTab';
import { TimelineTab } from '../Tabs/TimeLineTAb';
import { TreeTab } from '../Tabs/TreeTab';
import { VisualEditorTab } from '../Tabs/VisualEditorTab';
import { WorkSpaceConfig, WorkspaceTab } from '../WorkSpaceApi/workspaceState';

export interface TabsConfigItem {
    title: string;
    tabId: WorkspaceTab;
    icon: React.FC;
    viewComponent: React.FC<{ isActive: boolean }>;
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
        title: 'Editor',
        tabId: 'editor',
        icon: Gantt,
        viewComponent: VisualEditorTab,
    },
    {
        title: 'PowerBI',
        tabId: 'analytics',
        icon: Analytics,
        viewComponent: PowerBiTab,
    },
    {
        title: 'Help',
        tabId: 'help',
        icon: HelpPageIcon,
        viewComponent: HelpPageTab,
    },
];

interface ActiveTabs {
    tabs: TabsConfigItem[];
    viewIsActive: boolean;
}

function getTabConfig(tabsConfig: TabsConfigItem[]) {
    return function useConfiguredTabs({
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        workflowEditorOptions,
        powerBiOptions,
        helpPageOptions,
    }: WorkSpaceConfig<unknown>): ActiveTabs {
        const tabs = tabsConfig.filter((item) => {
            if (treeOptions && item.title === 'Tree') return true;
            if (tableOptions && item.title === 'Table') return true;
            if (gardenOptions && item.title === 'Garden') return true;
            if (timelineOptions && item.title === 'Timeline') return true;
            if (workflowEditorOptions && item.title === 'Editor') return true;
            if (powerBiOptions && item.title === 'PowerBI') return true;
            if (helpPageOptions && item.title === 'Help') return true;
        });
        return {
            tabs,
            viewIsActive: tabs.length > 0,
        };
    };
}

export const useConfiguredTabs = getTabConfig(tabsConfig);
