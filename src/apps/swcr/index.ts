import { AppApi } from '../apps';
import { baseClient } from '../../../packages/httpClient/src';
import { SwcrPackage } from './SwcrPackage';
import { createWorkSpace } from '../../Core/WorkSpace/src/WorkSpaceApi/Api';
import { SwcrItemView } from './SwcrGardenItem';
import {
    getHoursGroupKey,
    getIsSafetyKey,
    getLatestSignedRankingKey,
    getNextSignatureRoleKeys,
    getNextToSignKeys,
    getRfccDueDateKey,
    getRfccKey,
    getRfocKey,
    getStartImplForecastKey,
    getTypeKeys,
    getYearAndWeekFromString,
    sortColumnByDefault,
} from './utilities/packages';
import { SwcrGroupView } from './SwcrGroupView';
import { GetKeyFunction } from '../../Core/WorkSpace/src/WorkSpaceApi/State';
import { SwcrHeaderView } from './SwcrGardenHeader';

export type FieldSetting<T> = {
    key?: keyof T;
    label?: string;
    getKey?: GetKeyFunction<T>;
};

export type FieldSettings<ItemType, ExtendedFields extends string | number | void = void> = Partial<
    Record<keyof ItemType & ExtendedFields, FieldSetting<ItemType>>
>;

export function setup(appApi: AppApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.fusion]);

    const swcr = createWorkSpace<SwcrPackage>({
        initialState: [],
        primaryViewKey: 'swcrId',
        viewerId: appApi.shortName,
    });

    swcr.registerDataSource(async () => {
        const response = await api.fetch(
            `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/3380fe7d-e5b7-441f-8ce9-a8c3133ee499/swcr`
        );
        const swcrPackages = JSON.parse(await response.text()) as SwcrPackage[];

        return swcrPackages.sort(sortColumnByDefault);
    });

    swcr.registerFilterOptions({
        typeMap: { siteCode: 'Site Code' },
        excludeKeys: [
            'description',
            'nextsToSign',
            'projectDescription',
            'modification',
            'rowKey',
            'url',
            'updatedAtDate',
            'cntAttachments',
            'title',
            'swcrId',
        ],
    });

    type GardenFields =
        | 'isSafety'
        | 'RFCC'
        | 'RFCCDueDate'
        | 'RFOC'
        | 'isSafety'
        | 'startImplForecast'
        | 'nextSignatureRole';

    const fieldSettings: FieldSettings<SwcrPackage, GardenFields> = {
        isSafety: { key: 'types', label: 'Is Safety', getKey: getIsSafetyKey },
        estimatedManhours: { label: 'Estimated man hours', getKey: getHoursGroupKey },
        types: { label: 'Types', getKey: getTypeKeys },
        nextToSign: { label: 'Next signature by', getKey: getNextToSignKeys },
        nextSignatureRole: { label: 'Next signature role', getKey: getNextSignatureRoleKeys },
        latestSignRanking: { label: 'Last signed ranking', getKey: getLatestSignedRankingKey },
        RFCC: { label: 'RFCC', getKey: getRfccKey },
        RFCCDueDate: { label: 'RFCC duedate', getKey: getRfccDueDateKey },
        startImplForecast: { label: 'Start impl. forecast', getKey: getStartImplForecastKey },
        RFOC: { label: 'RFOC', getKey: getRfocKey },
        closedAtDate: {
            label: 'Closed at date',
            getKey: (item) => [getYearAndWeekFromString(item.closedAtDate)],
        },
        dueAtDate: {
            label: 'Due date',
            getKey: (item) => [getYearAndWeekFromString(item.dueAtDate)],
        },
        siteCode: { label: 'Site Code' },
        projectIdentifier: { label: 'ProjectIdentifier' },
        swcrNo: { label: 'Swcr No' },
        priority: { label: 'Priority' },
        system: { label: 'System' },
        controlSystem: { label: 'Control System' },
        contract: { label: 'Contract' },
        action: { label: 'Action' },
        supplier: { label: 'Supplier' },
        node: { label: 'Node' },
        referenceTypes: { label: 'Reference Types' },
        nextSignRanking: { label: 'Next signature ' },
        cpkgNo: { label: 'CommPK' },
        cpkgPhase: { label: 'Phase' },
        status: { key: 'status', label: 'Status' },
    };

    swcr.registerTableOptions({ objectIdentifierKey: 'swcrId' });

    swcr.registerGardenOptions({
        gardenKey: 'dueAtDate',
        itemKey: 'swcrNo',
        groupByKeys: [],
        fieldSettings: fieldSettings,
        excludeKeys: [
            'projectDescription',
            'description',
            'modification',
            'rowKey',
            'url',
            'updatedAtDate',
            'cntAttachments',
            'title',
            'swcrId',
        ],
        customViews: {
            customItemView: SwcrItemView,
            customGroupView: SwcrGroupView,
            customHeaderView: SwcrHeaderView,
        },
        options: { groupDescriptionFunc: (data) => data.title },
    });
}
