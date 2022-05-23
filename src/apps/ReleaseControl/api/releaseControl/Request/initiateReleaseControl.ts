import { patchReleaseControl } from './patchReleaseControl';
import { ReleaseControl } from '../../../types/releaseControl';

/**
 *
 * @param request
 */

interface InitiateScopeChangeParams {
    release: ReleaseControl;
}

export async function initiateReleaseControl({
    release,
}: InitiateScopeChangeParams): Promise<void> {
    const releaseControl: ReleaseControl = {
        ...release,
        description: release.description,
        id: release.id,
        phase: release.phase,
        title: release.title,
    };

    const payload = {
        ...releaseControl,
        setAsOpen: true,
    };

    await patchReleaseControl(payload);
}
