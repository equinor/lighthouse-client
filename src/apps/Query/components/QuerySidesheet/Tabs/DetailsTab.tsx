import { StringCell, Table, formatDateString } from '@equinor/GardenUtils';
import styled from 'styled-components';
import { Query } from '../../../types';
import { getPossibleWarranty, getScheduleImpact } from '../../../utility/helpers';
import { QuerySignatureTable } from './QuerySignatureTable';
const TabContent = styled.div`
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    h3 {
        padding: 8px;
    }
`;

type DetailsTabProps = {
    query: Query;
};
export const DetailsTab = ({ query }: DetailsTabProps): JSX.Element => {
    return (
        <TabContent>
            <h3>Details</h3>

            <Table>
                <tbody>
                    <tr>
                        <td>Status</td>
                        <td>
                            <StringCell value={query.queryStatus} />
                        </td>
                    </tr>
                    <tr>
                        <td>Discipline</td>
                        <td>
                            <StringCell value={query.disciplineDescription} />
                        </td>
                    </tr>
                    <tr>
                        <td>Query type</td>
                        <td>
                            <StringCell value={query.queryType} />
                        </td>
                    </tr>
                    <tr>
                        <td>Milestone</td>
                        <td>
                            <StringCell value={query.milestone} />
                        </td>
                    </tr>
                    <tr>
                        <td>Next to sign</td>
                        <td>
                            <StringCell value={query.nextToSign} />
                        </td>
                    </tr>
                    <tr>
                        <td>Possible warranty claim</td>
                        <td>
                            <StringCell value={getPossibleWarranty(query)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Schedule impact</td>
                        <td>
                            <StringCell value={getScheduleImpact(query)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Required reply</td>
                        <td>
                            <StringCell value={formatDateString(query.requiredAtDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>
                            <StringCell value={query.title} />
                        </td>
                    </tr>
                    <tr>
                        <td>Consequence</td>
                        <td>
                            <StringCell value={query.consequenceIfNotImplemented} />
                        </td>
                    </tr>
                    <tr>
                        <td>Proposed solution</td>
                        <td>
                            <StringCell value={query.proposedSolution} />
                        </td>
                    </tr>
                    <tr>
                        <td>Engineering reply</td>
                        <td>
                            <StringCell value={query.engineeringReply} />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <h3>Signatures</h3>
            <QuerySignatureTable query={query} />
        </TabContent>
    );
};
