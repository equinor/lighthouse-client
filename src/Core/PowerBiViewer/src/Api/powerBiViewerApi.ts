import { CoreViewState, FusionPowerBiOptions } from '../Types/State';
import { dispatch, getContext } from './powerBiViewerState';

export interface PowerBiViewerOptions {
  title: string;
  viewerId: string;
}

export interface PowerBIViewerInstance {
  registerFusionPowerBi(options: FusionPowerBiOptions): PowerBIViewerInstance;
}

export function createPowerBiViewer({
  viewerId,
  title,
}: PowerBiViewerOptions): PowerBIViewerInstance {
  dispatch(getContext(), (state: CoreViewState) => {
    if (state[viewerId]) {
      // eslint-disable-next-line no-console
      console.warn(`${viewerId} is already registered PowerBiViewer.`);
    }
    return {
      ...state,
      [viewerId]: {
        groupe: state[viewerId]?.groupe,
        title,
        shortName: viewerId,
        report: state[viewerId]?.report,
      },
    };
  });

  const powerBiViewerApi = {
    registerFusionPowerBi(options: FusionPowerBiOptions) {
      dispatch(getContext(), (state: CoreViewState) => {
        const report: FusionPowerBiOptions = state[viewerId].report
          ? { ...state[viewerId].report, ...options }
          : options;
        return {
          ...state,
          [viewerId]: {
            ...state[viewerId],
            report,
          },
        };
      });
      return powerBiViewerApi;
    },
  };

  return powerBiViewerApi;
}
