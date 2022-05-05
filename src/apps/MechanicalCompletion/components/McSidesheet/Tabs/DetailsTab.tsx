import { formatDateString, StringCell, Table } from '@equinor/GardenUtils';
import styled from 'styled-components';
import { McPackage } from '../../../types';
const TabContent = styled.div`
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    h3 {
        padding: 8px;
    }
`;
type DetailsTabProps = {
    mcPackage: McPackage;
};
export const DetailsTab = ({ mcPackage }: DetailsTabProps) => {
    return (
        <TabContent>
            <h3>Details</h3>
            <Table>
                <tbody>
                    <tr>
                        <td>Project</td>
                        <td>
                            <StringCell
                                value={`${mcPackage.projectDescription} (${mcPackage.projectIdentifier})`}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>MC Package Responsible</td>
                        <td>
                            <StringCell value={mcPackage.responsible} />
                        </td>
                    </tr>
                    <tr>
                        <td>MC Package Discipline</td>
                        <td>
                            <StringCell
                                value={`${mcPackage.discipline} ${mcPackage.disciplineDescription}`}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>MC Package Area</td>
                        <td>
                            <StringCell value={mcPackage.area} />
                        </td>
                    </tr>
                    <tr>
                        <td>MC Package Phase</td>
                        <td>
                            <StringCell value={mcPackage.phase} />
                        </td>
                    </tr>
                    <tr>
                        <td>Commissioning Package</td>
                        <td>
                            <StringCell value={mcPackage.commPkgNumber} />
                        </td>
                    </tr>
                    <tr>
                        <td>System</td>
                        <td>
                            <StringCell value={mcPackage.system} />
                        </td>
                    </tr>
                    <tr>
                        <td>Subsystem</td>
                        <td>
                            <StringCell value={mcPackage.subsystem} />
                        </td>
                    </tr>
                    <tr>
                        <td>Remark</td>
                        <td>
                            <StringCell value={mcPackage.remark} />
                        </td>
                    </tr>
                    <tr>
                        <td>M-01 Contractor Final Punch Actual date</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.finalPunchActualDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>M-02 Punch Status Accepted Actual Date</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.punchAcceptActualDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>M-03 RFC MC to Commissioning Actual Date</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.rfccShippedDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>M-04 RFCC Actual Date</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.rfccActualDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Commissioning Priority 1</td>
                        <td>
                            <StringCell value={mcPackage.priority} />
                        </td>
                    </tr>
                    <tr>
                        <td>Commissioning Priority 2</td>
                        <td>
                            <StringCell value={mcPackage.priority2} />
                        </td>
                    </tr>
                    <tr>
                        <td>Commissioning Priority 3</td>
                        <td>
                            <StringCell value={mcPackage.priority3} />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <h3>Milestones</h3>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Planned</th>
                        <th>Forecast</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Final punch</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.finalPunchPlannedDate)} />
                        </td>
                        <td>
                            <StringCell
                                value={formatDateString(mcPackage.finalPunchForecastDate)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>RFCC</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.rfccPlannedDate)} />
                        </td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.rfccForecastDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>TAC</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.tacPlannedDate)} />
                        </td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.tacForecastDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>RFOC</td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.rfocPlannedDate)} />
                        </td>
                        <td>
                            <StringCell value={formatDateString(mcPackage.rfocForecastDate)} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </TabContent>
    );
};
