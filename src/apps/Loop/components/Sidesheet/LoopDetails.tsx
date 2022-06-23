import { formatDateString, StringCell, Table } from '@equinor/GardenUtils';
import { Loop } from '../../types';

type LoopDetailsProps = {
    loop: Loop;
};
export const LoopDetails = ({ loop }: LoopDetailsProps) => {
    return (
        <div>
            <h3>Details</h3>
            <Table>
                <tbody>
                    <tr>
                        <td>Project</td>
                        <td>
                            <StringCell value={loop.project} />
                        </td>
                    </tr>
                    <tr>
                        <td>Loop</td>
                        <td>
                            <StringCell value={loop.tagNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm pkg</td>
                        <td>
                            <StringCell value={loop.commissioningPackageNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>Mc pkg</td>
                        <td>
                            <StringCell value={loop.mechanicalCompletionPackageNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>
                            <StringCell value={loop.location} />
                        </td>
                    </tr>
                    <tr>
                        <td>Aggregated MC status</td>
                        <td>
                            <StringCell value={loop.loopContentStatus} />
                        </td>
                    </tr>

                    <tr>
                        <td>Planned/Actual MC complete</td>
                        <td>
                            <StringCell
                                value={formatDateString(
                                    loop.woActualCompletionDate
                                        ? loop.woActualCompletionDate.toString()
                                        : null
                                )}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Remaning hours</td>
                        <td>
                            <StringCell
                                value={loop.remainingManHours ? `${loop.remainingManHours}` : 'N/A'}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
