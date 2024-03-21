import { StatusItem } from '@equinor/lighthouse-status-bar';
import { Query } from '../../types';
function numberFormat(number: number): string {
  return parseFloat(Math.round(number).toString()).toLocaleString('no');
}

type Kpi = {
  totalQuery: number;
  open: number;
  closed: number;
  overdue: number;
  'closed %': number;
};
type PartialKpi = Pick<Kpi, 'open' | 'closed' | 'overdue'>;
const getKpis = (data: Query[]): Kpi => {
  const counts = data.reduce(
    (acc, curr) => {
      if (curr.isOpen == 0) {
        acc.closed += 1;
      } else {
        acc.open += 1;
      }
      if (curr.isOverdue) {
        acc.overdue += 1;
      }

      return acc;
    },
    { open: 0, closed: 0, overdue: 0 } as PartialKpi
  );

  return {
    ...counts,
    'closed %': Number(((counts.closed / data.length) * 100).toFixed(2)),
    totalQuery: data.length,
  };
};
export const statusBarConfig = (data: Query[]): StatusItem[] => {
  const kpis = getKpis(data);
  return [
    {
      title: 'Total query',
      value: () => numberFormat(kpis.totalQuery),
    },
    {
      title: 'Open',
      value: () => numberFormat(kpis.open),
    },
    {
      title: 'Closed',
      value: () => numberFormat(kpis.closed),
    },
    {
      title: 'Overdue',
      value: () => numberFormat(kpis.overdue),
    },
    {
      title: 'Closed %',
      value: () => `${kpis['closed %']}%`,
    },
  ];
};
