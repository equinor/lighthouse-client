import { useContext, useEffect, useReducer } from 'react';
import { GardenGroups } from '../Models/data';
import { FieldSettings } from '../Models/fieldSettings';
import { CustomVirtualView, GardenOptions, Options, StatusView } from '../Models/gardenOptions';
import { actions } from './ParkViewActions';
import { ParkViewContext, ParkViewProviderProps, ParkViewState } from './ParkViewContext';
import { GardenReducer } from './ParkViewReducer';

export function ParkViewProvider<T extends Record<PropertyKey, unknown>>({
  children,
  data,
  parkViewOptions,
}: ParkViewProviderProps<T>): JSX.Element {
  const initialState: ParkViewState<T> = {
    ...parkViewOptions,
    data: data,
    objectIdentifier: parkViewOptions.objectIdentifier,
    groupByKeys: parkViewOptions?.groupByKeys || [],
    onSelect: parkViewOptions.onSelect as (item: unknown) => string,
    onGroupeSelect: parkViewOptions.onGroupeSelect as (item: unknown) => string,
    gardenKey: (parkViewOptions as GardenOptions<T>)?.gardenKey,
  };
  const [state, dispatch] = useReducer(GardenReducer, initialState);

  function setGroupKeys(groupKeys: string[]): void {
    const keys = groupKeys;
    dispatch(actions.setGroupKeys(keys));
  }

  function setGardenKey(gardenKey?: string): void {
    dispatch(actions.setGardenKey(gardenKey));
  }

  function setCustomGroupKeys(groupKeys: Record<string, unknown>): void {
    dispatch(actions.setCustomGroupKeys(groupKeys));
  }
  //Runs on every filter update
  useEffect(() => {
    dispatch(actions.setData(data as unknown[]));

    const customState = (parkViewOptions as GardenOptions<T>)?.customStateFunction?.(data);

    customState && dispatch(actions.setCustomState(customState));
  }, [data, parkViewOptions]);

  return (
    <ParkViewContext.Provider
      value={{
        ...state,
        setGroupKeys,
        setGardenKey,
        setCustomGroupKeys,
      }}
    >
      {children}
    </ParkViewContext.Provider>
  );
}

export function useParkViewContext<T extends Record<PropertyKey, unknown>>() {
  const parkViewContext = useContext(ParkViewContext);

  return {
    ...parkViewContext,
    gardenKey: parkViewContext.gardenKey as keyof T,
    itemKey: parkViewContext.itemKey as keyof T,
    groupByKeys: parkViewContext.groupByKeys as (keyof T)[],
    customView: parkViewContext.customViews as CustomVirtualView<T>,
    customGroupByKeys: parkViewContext.customGroupByKeys || {},
    customState: parkViewContext.customState || {},
    status: parkViewContext.status as StatusView<T>,
    options: parkViewContext.options as Options<T>,
    data: parkViewContext.data as T[],
    fieldSettings: parkViewContext.fieldSettings as FieldSettings<T, string>,
    sortData: parkViewContext.sortData as (data: T[], ...groupByKeys: (keyof T)[]) => T[],
    itemWidth: parkViewContext.itemWidth as GetItemWidth<T>,
    customItemColor: parkViewContext.customItemColor ?? (() => '#d9e9f2'),
  };
}

type GetItemWidth<T extends Record<PropertyKey, unknown>> = (
  gardenGroups: GardenGroups<T>,
  groupKey: string,
  customGroupByKeys?: Record<string, unknown>
) => number;
