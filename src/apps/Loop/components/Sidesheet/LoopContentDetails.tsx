import { formatDateString, statusColorMap, StringCell, Table } from '@equinor/GardenUtils';
import { Loop } from '../../types';
import { Status } from '../Status';
import { LoopContentTable } from './LoopContentTable';

type LoopContentDetailsProps = {
    item: Loop;
};
export const LoopContentDetails = ({ item }: LoopContentDetailsProps) => {
    return (
        <div style={{ height: 'fit-content' }}>
            <h3>Content</h3>
            <Table>
                <tr>
                    <td>MC status of content</td>
                    <td>
                        {item.loopContentStatus ? (
                            <Status
                                content={item.loopContentStatus}
                                statusColor={statusColorMap[item.loopContentStatus]}
                            />
                        ) : (
                            '-'
                        )}
                    </td>
                </tr>

                <tr>
                    <td>Planned MC complete of content</td>
                    <td>
                        {item.woPlannedCompletionDate ? (
                            <StringCell
                                value={formatDateString(item.woPlannedCompletionDate.toString())}
                            />
                        ) : (
                            '-'
                        )}
                    </td>
                </tr>
                <tr>
                    <td>Actual MC complete of content</td>
                    <td>
                        {item.woActualCompletionDate ? (
                            <StringCell
                                value={formatDateString(item.woActualCompletionDate.toString())}
                            />
                        ) : (
                            '-'
                        )}
                    </td>
                </tr>
            </Table>

            <LoopContentTable loop={item} />
        </div>
    );
};
