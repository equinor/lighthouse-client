import { httpClient } from '@equinor/lighthouse-portal-client';
import { downloadToDrive } from '@equinor/lighthouse-utils';
import { Row } from '@equinor/Table';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';

export const excelExport = async (rows: Row<ScopeChangeRequest>[]) => {
    const { scopeChange } = httpClient();
    const ids = rows.map((sc) => sc.original.id);
    const bodyInit = JSON.stringify({
        type: 'Excel',
        ids: ids,
    });

    try {
        const res = await scopeChange.post('api/scope-change-requests/export', {
            headers: {
                'Content-Type': 'application/*+json',
            },
            body: bodyInit,
        });
        if (!res.ok) throw new Error('Failed to export');
        const blob = await res.blob();

        const url = window.URL.createObjectURL(
            new Blob([blob], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
        );

        downloadToDrive(url, 'scope-change-excel');
    } catch (e) {
        throw new Error('Failed to export');
    }
};
