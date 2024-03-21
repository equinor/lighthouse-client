import { Button } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const ActionBar = styled.div`
  height: 64px;
  width: 100%;
  border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
  background-color: white;
  margin-top: 100px;
  max-width: 95%;
`;

export const ButtonContainer = styled.div`
  flex-direction: row;
  gap: 0.5em;
  display: flex;
  align-items: center;
  padding: 1em;
  float: right;
`;

export const NavigationButton = styled.div`
  flex-direction: row;
  gap: 0.5em;
  display: flex;
  align-items: center;
  float: left;
  padding: 1em;
  float: left;
`;

export const SelectionRow = styled.div`
  width: 400px;
`;

export const NewStepButton = styled(Button)`
  margin-bottom: 20px;
  margin-left: 60px;
  margin-top: 16px;
  width: 100px;
`;

export const FlexColumn = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  height: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 95%;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: flex-end;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  overflow: auto;
`;

export const FormWrapper = styled.form`
  display: grid;
  grid-column: 2;
  grid-template-columns: repeat(auto-fit, minmax(675px, 1fr));
  gap: 2em;
  margin-bottom: 10px;
`;

export const AttachmentName = styled.a`
  color: ${tokens.colors.interactive.primary__resting.rgba};
  cursor: 'pointer';
  text-decoration: 'none';
`;

export const Inline = styled.span`
  display: flex;
  align-items: center;
`;

export const AttachmentsList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5em 0em;
  font-size: 16px;
  align-items: center;
`;
