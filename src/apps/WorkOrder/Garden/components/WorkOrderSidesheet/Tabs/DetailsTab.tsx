import { formatDateString, materialStatusMap, StringCell, Table } from '@equinor/GardenUtils';
import styled from 'styled-components';
import { WorkOrder } from '../../../models';
import { getWoStatus } from '../../../utility';

const TabContent = styled.div`
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    h3 {
        padding: 8px;
    }
`;

type DetailsTabProps = {
    workOrder: WorkOrder;
};
export const DetailsTab = ({ workOrder }: DetailsTabProps) => {
    return (
        <TabContent>
            <h3>Details</h3>

            <Table>
                <tbody>
                    <tr key={'range'}>
                        <td key={'1'}>Range</td>
                        <td key={'2'}>
                            <StringCell
                                value={`${formatDateString(
                                    workOrder.plannedStartDate
                                )} - ${formatDateString(workOrder.plannedFinishDate)}`}
                            />
                        </td>
                    </tr>
                    <tr key={'status'}>
                        <td key={'3'}>Status</td>
                        <td key={'4'}>
                            <StringCell value={getWoStatus(workOrder)} />
                        </td>
                    </tr>
                    <tr key={'disipline'}>
                        <td key={'5'}>Discipline</td>
                        <td key={'6'}>
                            <StringCell value={workOrder.discipline} />
                        </td>
                    </tr>
                    <tr key={'project'}>
                        <td key={'26'}>Project</td>
                        <td key={'27'}>
                            <StringCell
                                value={`${workOrder.projectIdentifier}, ${workOrder.projectDescription}`}
                            />
                        </td>
                    </tr>
                    <tr key={'responsible'}>
                        <td key={'7'}>Responsible</td>
                        <td key={'8'}>
                            <StringCell value={workOrder.responsible} />
                        </td>
                    </tr>
                    <tr key={'milestone'}>
                        <td key={'9'}>Milestone</td>
                        <td key={'10'}>
                            <StringCell value={workOrder.milestone} />
                        </td>
                    </tr>
                    <tr key={'projectprogress'}>
                        <td key={'11'}>Project progress</td>
                        <td key={'12'}>
                            <StringCell value={`${workOrder.projectProgress}%`} />
                        </td>
                    </tr>
                    <tr key={'estimatedmanhours'}>
                        <td key={'13'}>Estimated manhours</td>
                        <td key={'14'}>
                            <StringCell value={`${workOrder.estimatedHours}h`} />
                        </td>
                    </tr>
                    <tr key={'remainingmanhours'}>
                        <td key={'15'}>Remaining manhours</td>
                        <td key={'16'}>
                            <StringCell value={` ${workOrder.remainingHours}h`} />
                        </td>
                    </tr>
                    <tr key={'expandedmanhours'}>
                        <td key={'17'}>Expended manhours</td>
                        <td key={'26'}>
                            <StringCell value={`${workOrder.expendedHours}h`} />
                        </td>
                    </tr>
                    <tr key={'hold'}>
                        <td key={'18'}>Hold</td>
                        <td key={'19'}>
                            {workOrder.holdBy} {workOrder.holdByDescription}
                        </td>
                    </tr>
                    <tr key={'materialstatus'}>
                        <td key={'20'}>Material status</td>
                        <td key={'21'}>
                            {workOrder.materialStatus} {materialStatusMap[workOrder.materialStatus]}
                        </td>
                    </tr>
                    <tr key={'materialcomments'}>
                        <td key={'22'}>Material Comments</td>
                        <td key={'23'}>{workOrder.materialComments}</td>
                    </tr>
                    <tr key={'constrctionscomments'}>
                        <td key={'24'}>Construction Comments</td>
                        <td key={'25'}>{workOrder.constructionComments}</td>
                    </tr>
                </tbody>
            </Table>
        </TabContent>
    );
};
