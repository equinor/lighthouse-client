import { useCallback, useEffect, useState } from 'react';
import { getCommPkgsByIds } from '../../Api/PCS/getCommPkgsByIds';
import { CommissioningPackage } from '../../Api/PCS/Types/CommissioningPackage';

export function useCommissioningPackageResolver(commpkgNumbers: string[]): CommissioningPackage[] {
    const [commissioningPackages, setCommissioningPackages] = useState<CommissioningPackage[]>([]);

    const fetchCommpackages = useCallback(async () => {
        if (commpkgNumbers.length > 0) {
            const commPkgs = await getCommPkgsByIds(commpkgNumbers);
            setCommissioningPackages(commPkgs);
        }
    }, [commpkgNumbers]);

    useEffect(() => {
        if (!commpkgNumbers) return;
        fetchCommpackages();
    }, [commpkgNumbers, fetchCommpackages]);

    return commissioningPackages;
}
