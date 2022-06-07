import { EventHub } from '@equinor/lighthouse-utils';
import { SidesheetEvents } from '../Types/sidesheetEvents';

export const notifyListeners = (key: SidesheetEvents): void => new EventHub().publish(key, '');
