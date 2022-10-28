import { useEffect } from 'react';
import { useReleaseControlContext, useUnpackReferences } from '../../../hooks';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { HeaderTab, SidesheetTabList, Tab, TabList } from './sidesheetStyles';
import { Tabs } from '@equinor/eds-core-react';
import { EditScopeTab } from './EditTabs/EditScopeTab';
import { EditWorkflowTab } from './EditTabs/EditWorkflowTab';
import { HistoryTab } from './Tabs/HistoryTab';
import { useEdsTabs } from '@equinor/hooks';
import { TypedSelectOption } from '../../../../ScopeChangeRequest/api/Search/searchType';
import { FamTag } from '../../../types/releaseControl';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';

export const ReleaseControlRequestEditForm = (): JSX.Element => {
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const { activeTab, handleChange } = useEdsTabs();

    useEffect(() => {
        const { clearState, updateAtom } = DRCFormAtomApi;
        clearState();
        updateAtom({
            ...releaseControl,
            documentNumbers: releaseControl?.documents?.map((document) => document.id),
            punchListItemIds: releaseControl?.punchListItems?.map(
                (punchListItem) => punchListItem.id
            ),
            scopeChangeRequestReferences: releaseControl?.scopeChangeRequestReferences,
            tags: releaseControl?.scopeTags?.map(
                (famTag: FamTag): TypedSelectOption => ({
                    label: `${famTag.tagNo}`,
                    value: famTag.tagNo,
                    type: 'famtag',
                    searchValue: famTag.tagNo,
                    object: famTag,
                })
            ),
            htCables: releaseControl?.scopeHTTags?.map(
                (famTag: FamTag): TypedSelectOption => ({
                    label: `${famTag.tagNo}`,
                    value: famTag.tagNo,
                    type: 'htcable',
                    searchValue: famTag.tagNo,
                    object: famTag,
                })
            ),
        });
        return () => {
            clearState();
        };
    }, []);

    useUnpackReferences({ releaseControl });

    return (
        <>
            <ReleaseControlSidesheetBanner />
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <HeaderTab>Scope</HeaderTab>
                    <HeaderTab>Workflow</HeaderTab>
                    <HeaderTab>History</HeaderTab>
                </SidesheetTabList>
                <TabList>
                    <Tab>
                        <EditScopeTab />
                    </Tab>
                    <Tab>
                        <EditWorkflowTab />
                    </Tab>
                    <Tab>
                        <HistoryTab />
                    </Tab>
                </TabList>
            </Tabs>
        </>
    );
};
