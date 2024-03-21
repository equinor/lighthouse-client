import { WorkOrderBase } from './types';

export const highestEstimate = (workOrders: WorkOrderBase[]): number => {
  return Math.max(...workOrders.map(({ estimatedManHours }) => Number(estimatedManHours) ?? 0));
};

export const highestExpended = (workOrders: WorkOrderBase[]): number => {
  return Math.max(...workOrders.map(({ expendedManHours }) => Number(expendedManHours) ?? 0));
};
