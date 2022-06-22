import { formatDateString, statusColorMap, StringCell, Table } from '@equinor/GardenUtils';
import { Case, Switch } from '@equinor/JSX-Switch';
import { Loop } from '../../types';
import { Status } from '../Status';

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
                        <td>Area</td>
                        <td>
                            <StringCell value={loop.location} />
                        </td>
                    </tr>
                    <tr>
                        <td>Form type</td>
                        <td>
                            <StringCell value={loop.formularType} />
                        </td>
                    </tr>
                    <tr>
                        <td>Responsible</td>
                        <td>
                            <StringCell value={loop.responsible} />
                        </td>
                    </tr>

                    <tr>
                        <td>MC status of content</td>
                        <td>
                            {loop.loopContentStatus ? (
                                <Status
                                    content={loop.loopContentStatus}
                                    statusColor={statusColorMap[loop.loopContentStatus]}
                                />
                            ) : (
                                '-'
                            )}
                        </td>
                    </tr>

                    <tr>
                        <td>Planned MC complete of content</td>
                        <td>
                            {loop.woPlannedCompletionDate ? (
                                <StringCell
                                    value={formatDateString(
                                        loop.woPlannedCompletionDate.toString()
                                    )}
                                />
                            ) : (
                                '-'
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Actual MC complete</td>
                        <td>
                            {loop.woActualCompletionDate ? (
                                <StringCell
                                    value={formatDateString(loop.woActualCompletionDate.toString())}
                                />
                            ) : (
                                '-'
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
