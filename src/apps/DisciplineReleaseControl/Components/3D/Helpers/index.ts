import { tokens } from '@equinor/eds-tokens';
import { TagMap } from '../../../../../packages/ModelViewer/components/tagOverlay';
import { EleNetwork } from '../../../Types/eleNetwork';

export function getIconName(type: string): string {
    switch (type) {
        case 'K_BOX':
            return 'junction_box';
        case 'TAVLE':
            return 'junction_box';
        case 'LINE':
            return 'cable';
        case 'HT_KAB':
            return 'heat_trace';
        default:
            return 'tag';
    }
}

export function getStatusColor(status: string): string {
    switch (status) {
        case 'OK':
            return tokens.colors.interactive.secondary__resting.rgba;
        case 'OS':
            return tokens.colors.ui.background__medium.rgba;
        case 'PA':
            return tokens.colors.interactive.danger__resting.rgba;
        case 'PB':
            return tokens.colors.interactive.warning__resting.rgba;
        default:
            return tokens.colors.interactive.primary__resting.rgba;
    }
}

export function getTagOverlay(data: EleNetwork[] | undefined): TagMap {
    const overlay: TagMap = {};

    data?.forEach((eleNetwork: EleNetwork) => {
        eleNetwork.checkLists.forEach((checkList) => {
            overlay[checkList.tagNo] = {
                tagNo: checkList.tagNo,
                type:
                    checkList.tagNo === eleNetwork.switchBoardTagNo
                        ? 'LINE'
                        : eleNetwork.circuits.find((i) => i.tagNo === checkList.tagNo)
                              ?.eleSymbolCode || 'unknown',
                status: checkList.status,
            };
        });
    });

    return overlay;
}
