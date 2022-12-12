import { StringCell, Table, formatDateString } from '@equinor/GardenUtils';
import styled from 'styled-components';
import { Punch } from '../../../types';
import { getMaterialRequired } from '../../../utility/config/punchItemMapping';

const TabContent = styled.div`
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    h3 {
        padding: 8px;
    }
`;

type DetailsTabProps = {
    punch: Punch;
};
export const DetailsTab = ({ punch }: DetailsTabProps): JSX.Element => {
    return (
        <TabContent>
            <h3>Details</h3>

            <Table>
                <tbody>
                    <tr>
                        <td>Category</td>
                        <td>
                            <StringCell value={punch.category} />
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>
                            <StringCell value={punch.status} />
                        </td>
                    </tr>
                    <tr>
                        <td>Priority</td>
                        <td>
                            <StringCell value={punch.priority} />
                        </td>
                    </tr>
                    <tr>
                        <td>Sorting</td>
                        <td>
                            <StringCell value={punch.sorting} />
                        </td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>
                            <StringCell value={punch.type} />
                        </td>
                    </tr>
                    <tr>
                        <td>Estimate</td>
                        <td>
                            <StringCell
                                value={punch.estimate !== null ? punch.estimate.toString() : null}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Raised by</td>
                        <td>
                            <StringCell value={punch.raisedBy} />
                        </td>
                    </tr>
                    <tr>
                        <td>Clearing by</td>
                        <td>
                            <StringCell value={punch.cleardBy} />
                        </td>
                    </tr>
                    <tr>
                        <td>Cleared date</td>
                        <td>
                            <StringCell value={formatDateString(punch.clearedAtDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Verified date</td>
                        <td>
                            <StringCell value={formatDateString(punch.verifiedAtDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Handover plan</td>
                        <td>
                            <StringCell value={formatDateString(punch.handoverPlan)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Due date</td>
                        <td>
                            <StringCell value={formatDateString(punch.dueDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Material required</td>
                        <td>
                            <StringCell value={getMaterialRequired(punch)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Material est. arrival</td>
                        <td>
                            <StringCell
                                value={formatDateString(punch.materialEstimatedTimeOfArrival)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Created date</td>
                        <td>
                            <StringCell value={formatDateString(punch.createdDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>
                            <StringCell value={punch.description} />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <h3>Checklist</h3>

            <Table>
                <tbody>
                    <tr>
                        <td>Form type</td>
                        <td>
                            <StringCell value={punch.formularType} />
                        </td>
                    </tr>
                    <tr>
                        <td>Form group</td>
                        <td>
                            <StringCell value={punch.formularGroup} />
                        </td>
                    </tr>
                    <tr>
                        <td>Form discipline</td>
                        <td>
                            <StringCell value={punch.formularDiscipline} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </TabContent>
    );
};
