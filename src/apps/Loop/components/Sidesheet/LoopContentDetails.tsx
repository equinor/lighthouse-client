import { formatDateString, statusColorMap, StringCell, Table } from '@equinor/GardenUtils';
import styled from 'styled-components';
import { Loop } from '../../types';
import { Status } from '../Status';
import { LoopContentTable } from './LoopContentTable';
const Wrapper = styled.div`
    height: fit-content;
`;
type LoopContentDetailsProps = {
    item: Loop;
};
export const LoopContentDetails = ({ item }: LoopContentDetailsProps) => {
    return (
        <Wrapper>
            <h3>Content</h3>
            <Table>
                <tbody>
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
                                    value={formatDateString(
                                        item.woPlannedCompletionDate.toString()
                                    )}
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
                </tbody>
            </Table>

            <LoopContentTable loop={item} />
        </Wrapper>
    );
};
