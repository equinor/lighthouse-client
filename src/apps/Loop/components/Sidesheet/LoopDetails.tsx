import { StringCell, Table } from '@equinor/GardenUtils';
import styled from 'styled-components';
import { Loop } from '../../types';
const Wrapper = styled.div`
  height: fit-content;
`;
type LoopDetailsProps = {
  loop: Loop;
};
export const LoopDetails = ({ loop }: LoopDetailsProps) => {
  return (
    <Wrapper>
      <h3>Details</h3>
      <Table>
        <tbody>
          <tr>
            <td>System</td>
            <td>
              <StringCell value={loop.functionalSystem} />
            </td>
          </tr>
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
            <td>Status</td>

            <td>
              <StringCell value={loop.tagStatus} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};
