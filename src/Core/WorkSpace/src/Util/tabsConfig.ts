import React from 'react';
import { Analytics } from '../Icons/Analytics';
import { Gantt } from '../Icons/Gantt';
import { Garden } from '../Icons/Garden';
import { Table } from '../Icons/Table';
import { Tree } from '../Icons/Tree';
import { GardenTab } from '../Tabs/GardenTab';
import { ListTab as TableTab } from '../Tabs/ListTab';
import { PowerBiTab } from '../Tabs/PowerBiTab';
import { TreeTab } from '../Tabs/TreeTab';
import { VisualEditorTab } from '../Tabs/VisualEditorTab';
import { WorkSpaceConfig, WorkspaceTab } from '../WorkSpaceApi/workspaceState';

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
        workflowEditorOptions,
        powerBiOptions,
    }: WorkSpaceConfig<unknown>): ActiveTabs {
        const tabs = tabsConfig.filter((item) => {
            switch (item.tabId) {
                case 'tree': {
                    return Boolean(treeOptions);
                }

                case 'table': {
                    return Boolean(tableOptions);
                }

                case 'garden': {
                    return Boolean(gardenOptions);
                }

                case 'editor': {
                    return Boolean(workflowEditorOptions);
                }

                case 'analytics': {
                    return Boolean(powerBiOptions);
                }

                default: {
                    return false;
                }
            }
        });
        return {
            tabs,
            viewIsActive: tabs.length > 0,
        };
    };
}

export const useConfiguredTabs = getTabConfig(tabsConfig);
