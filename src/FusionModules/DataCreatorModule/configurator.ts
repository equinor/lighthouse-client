import {
    AccessFunctionResult,
    CreatorComponent,
    CreatorConfig,
    CreatorManifest,
    CreatorType,
    DataCreatorConfig
} from './types';

export interface IDataCreatorConfigurator {
    configuration: DataCreatorConfig;
    configure(configuration: DataCreatorConfig): void;
}

export class DataCreatorConfigurator implements IDataCreatorConfigurator {
    configuration: DataCreatorConfig;

    constructor() {
        this.configuration = {} as DataCreatorConfig;
    }

    configure(configuration: DataCreatorConfig): void {
        this.configuration = configuration;
    }
}

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
