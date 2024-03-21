import {
  AccessFunctionResult,
  CreatorComponent,
  CreatorConfig,
  CreatorManifest,
  CreatorType,
} from './types';

export function setupCreator({ widgetId, title, color, props, widget }: CreatorConfig): <
  T extends CreatorType
>(
  type: T
) => {
  CreatorManifest: CreatorManifest;
  CreatorComponent: CreatorComponent;
  AccessFunctionResult: AccessFunctionResult;
}[T] {
  const creatorManifest: CreatorManifest = {
    widgetId: widgetId,
    widgetType: 'creator',
    title: title,
    color: color,
    props: {
      accessCheckFunctionId: props.accessCheckFunctionId,
      parentApp: props.parentApp,
    },
  };

  return <T extends CreatorType>(type: T) =>
    ({
      CreatorManifest: creatorManifest,
      CreatorComponent: {
        widgetId,
        widgetType: creatorManifest.widgetType,
        widget,
      },

      AccessFunctionResult: {
        functionId: props.accessCheckFunctionId,
        function: props.function,
      },
    }[type]);
}
