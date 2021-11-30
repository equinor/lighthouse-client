import { getDatePercentage, getDateStatus, getPercentage, getStatus, StatusItem } from '@equinor/StatusBar';
import { Garden } from '../../../components/Garden';
import { AnalyticsOptions } from '../../../packages/Diagrams/src/types/analyticsOptions';
import { Loop } from '../loopApp';


function Component<Loop>({ data }: { data: Loop[] }) {

    return (<div style={{ overflow: "scroll", height: 350 }}>
        <Garden<Loop> data={data} groupeKey={'phase' as keyof Loop} itemKey='tagNo' />
    </div>);
}

export const analyticsOptions: AnalyticsOptions<Loop> = {
    section1: {
        chart1: {
            type: 'timeBarChart',
            options: {
                title: 'Loops Created',
                defaultTime: 'year',
                timeChartOptions: {
                    categoriesKey: 'createdAt',
                    title: 'Created',
                    type: 'bar',
                },
            },
        },
    },
    section2: {
        chart1: {
            type: 'barChart',
            options: {
                stacked: true,
                nameKey: 'status',
                categoryKey: 'responsible',
                colors: ['#F44336', '#E91E63', '#9C27B0'],
            },
        },
        chart2: {
            type: 'timeBarChart',
            options: {
                title: 'Punch A',
                defaultTime: 'quarter',
                timeChartOptions: {
                    categoriesKey: 'createdAt',
                    title: 'PB',
                    type: 'bar',
                    key: 'status',
                    value: 'PB',
                },
            },
        },
    },
    section3: {
        chart1: {
            type: 'customVisual',
            options: {
                component: Component
            },
        },

    },
};

export function statusBarData(data: Loop[]): StatusItem[] {
    return [
        {
            title: "Status OK",
            value: () => getPercentage(data, "status", "OK"),
            description: "Status",
            status: getStatus(data, "status", "OK")
        },
        {
            title: "Status OS",
            value: () => data.filter(i => i.status === "OS").length.toString(),
            description: "Status",
            status: getStatus(data, "status", "OS", true)
        },
        {
            title: "Signed",
            value: () => getDatePercentage(data, "signedAt"),
            description: "Status",
            status: getDateStatus(data, "signedAt")
        },
        {
            title: "Status PB",
            value: () => data.filter(i => i.status === "PB").length.toString(),
            description: "Status",
            status: getStatus(data, "status", "PB", true)
        },

    ]

}

